<!-- 实体常规增删改查表格 -->
<template>
  <v-card>
    <!-- 表格信息组件 -->
    <v-list-item>
      <v-list-item-icon v-if="icon">
        <icon :icon="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          <div v-if="title" v-text="title" />
          <slot name="title" />
        </v-list-item-title>
        <v-list-item-subtitle>
          <div v-if="subtitle" v-text="subtitle" />
          <slot name="subtitle" />
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="d-flex flex-row">
        <slot name="infoActions" />
        <v-btn v-if="!disableRefreshAction" fab small text :loading="status.fetching" :disabled="status.fetching" @click="fetchItems">
          <icon small>arrows-rotate</icon>
        </v-btn>
        <v-btn v-if="!disableCustomColumns" fab small text @click="columnDialog = true">
          <icon small>cog</icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider v-if="!disableTableActionBar" />
    <!-- 表级操作工具栏 -->
    <v-toolbar v-if="!disableTableActionBar" flat>
      <slot name="tableActions" />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <div v-if="!disableFilter && !filter.showAdvance" class="d-flex flex-grow-1">
        <v-autocomplete
          v-if="filterFields.length > 1"
          v-model="filter.field"
          dense
          rounded
          filled
          hide-details
          return-object
          class="mr-1 flex-grow-0"
          item-text="name"
          :disabled="status.fetching"
          :items="filterFields"
          :value="filterFields[0]"
        />
        <v-text-field
          v-model="filter.search"
          dense
          rounded
          filled
          hide-details
          class="flex-grow-1"
          :disabled="status.fetching"
          :placeholder="filter.field.desc"
          @keypress.enter="fetchItems()"
        >
          <template #append>
            <icon :icon="filterIcon" />
          </template>
        </v-text-field>
      </div>
      <template v-if="enableAdvanceFilter">
        <v-btn text v-if="filter.showAdvance" @click="filter.showAdvance = false" color="primary" class="ml-1">普通搜索 </v-btn>
        <v-btn text v-else @click="filter.showAdvance = true" color="primary" class="ml-1">高级搜索</v-btn>
      </template>
    </v-toolbar>
    <v-card-text v-if="enableAdvanceFilter && filter.showAdvance">
      <slot name="advanceFilter" v-bind:params="filter.advance" />
      <div class="d-flex">
        <v-spacer />
        <v-btn text color="primary" @click="fetchItems">搜索</v-btn>
        <v-btn text color="grey" @click="resetAdvanceFilter">重置</v-btn>
      </div>
    </v-card-text>
    <!-- 数据表格 -->
    <v-divider />
    <v-data-table
      v-model="selected"
      :dense="dense"
      :multi-sort="multiSort"
      :disable-filtering="disableFilter"
      :hide-default-footer="disablePagination"
      :disable-sort="disableSort"
      :show-select="showSelect"
      :checkbox-color="checkboxColor"
      :item-key="entityIdField"
      :loading="status.fetching"
      :loading-text="loadingText"
      :no-data-text="noDataText"
      :no-results-text="noResultText"
      :footer-props="footerProps"
      :headers="finalHeaders"
      :items="items"
      :server-items-length="pagination.total"
      @update:options="onPaginationChange"
    >
      <!-- 自定义列渲染插槽 -->
      <template v-for="column in customColumns" v-slot:[column]="{ item }">
        <slot :name="column" v-bind:item="item" />
      </template>
      <!-- 行级操作插槽 -->
      <template #item.actions="{ item }">
        <slot name="rowActions" v-bind:item="item"></slot>
      </template>
      <!-- 批处理操作插槽 -->
      <template #footer.prepend>
        <slot name="batchActions" v-bind:items="items" v-bind:selected="selected" />
      </template>
    </v-data-table>
    <!-- 新增、编辑表单模态框 -->
    <v-dialog v-model="dialog.show" :width="dialogWidth">
      <v-card>
        <v-list-item>
          <v-list-item-icon v-if="icon">
            <icon :icon="icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="dialog.title" />
            <v-list-item-subtitle>
              <!-- 表单描述信息插槽 -->
              <slot name="formSubtitle" v-bind:item="dialog.item" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-2" />
        <v-card-text>
          <v-form ref="form" :disabled="status.submitting">
            <slot name="form" v-bind:item="dialog.item" />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" :disabled="status.submitting" :loading="status.submitting" v-text="dialog.submitText" @click="onSubmit" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 自定义列选择模态框 -->
    <v-dialog v-model="columnDialog" :width="dialogWidth">
      <v-card>
        <v-list-item>
          <v-list-item-icon>
            <icon spin>cog</icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>定制列</v-list-item-title>
            <v-list-item-subtitle>勾选表格需要显示的列</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-card-text>
          <v-row dense no-gutters>
            <v-col v-for="header in tableHeaders" :key="header.value" cols="3">
              <v-checkbox v-model="header.visible" :label="header.text" hide-details />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="columnDialog = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 对话框组件 -->
    <confirm-dialog ref="confirm" />
  </v-card>
</template>

<script>
import qs from "qs";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Icon from "@/components/common/Icon";

export default {
  name: "EntityTable",
  components: { Icon, ConfirmDialog },
  props: {
    /*
     * 表格基础信息属性
     * */

    /* 实体操作基础API */
    api: {
      type: String,
      required: true,
    },
    /* 获取数据接口，默认为基础API的Get方法 */
    fetchApi: {
      type: String,
    },
    /* 新增数据接口，默认为基础API的Post方法 */
    createApi: {
      type: String,
    },
    /* 修改数据接口，默认为基础API的Put方法 */
    updateApi: {
      type: String,
    },
    /* 删除数据接口，默认为基础API的Delete方法 */
    deleteApi: {
      type: String,
    },
    /* 实体姓名 */
    entityName: {
      type: String,
      default: "数据",
    },
    /* 实体主键字段 */
    entityIdField: {
      type: String,
      default: "id",
    },
    /* 实体文本字段 */
    entityTextField: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    icon: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    /* 是否禁用表级操作工具栏 */
    disableTableActionBar: {
      type: Boolean,
      default: false,
    },
    /* 是否禁用搜索 */
    disableFilter: {
      type: Boolean,
      default: false,
    },
    /* 是否开启高级搜索 */
    enableAdvanceFilter: {
      type: Boolean,
      default: false,
    },
    /* 是否禁用分页 */
    disablePagination: {
      type: Boolean,
      default: false,
    },
    /* 是否禁用排序 */
    disableSort: {
      type: Boolean,
      default: false,
    },
    /* 是否支持多字段排序 */
    multiSort: {
      type: Boolean,
      default: false,
    },
    /* 是否支持定制显示列 */
    disableCustomColumns: {
      type: Boolean,
      default: false,
    },
    /* 是否显示手动刷新操作 */
    disableRefreshAction: {
      type: Boolean,
      default: false,
    },

    /*
     * 表格过滤器属性
     * */
    filterFields: {
      type: Array,
      default() {
        return [
          {
            name: "自动",
            desc: "输入关键字，按 回车 搜索",
            value: "search",
          },
        ];
      },
    },
    /* 高级搜索的搜索参数默认对象 */
    defaultAdvanceFilterParams: {
      type: Object,
      default() {
        return {};
      },
    },
    filterIcon: {
      type: String,
      default: "magnifying-glass",
    },
    /*
     * 表格过滤参数处理器
     * */
    filterSerializer: {
      type: Function,
      default: function (params) {},
    },

    /*
     * 数据表格属性
     * */

    /* 表头属性 */
    headers: {
      type: Array,
      required: true,
    },
    /* 表格没有数据时候显示的文本 */
    loadingText: {
      type: String,
      default: "获取数据中",
    },
    /* 表格没有数据时候显示的文本 */
    noDataText: {
      type: String,
      default: "无可用数据",
    },
    /* 表格没有搜索结果时候显示的文本 */
    noResultText: {
      type: String,
      default: "无可用结果",
    },

    /* 是否禁用行级操作，在不需要使用行级操作时使用 */
    disableRowAction: {
      type: Boolean,
      default: false,
    },

    /* 表格行级操作列头文本 */
    rowActionHeader: {
      type: String,
      default: "操作",
    },

    /*
     * 页脚属性
     * */

    /* 是否禁用每页数量选择 */
    disableItemsPerPage: {
      type: Boolean,
      default: false,
    },
    /* 是否禁用分页按钮 */
    disablePaginationButton: {
      type: Boolean,
      default: false,
    },
    /* 选择所有数据的文本 */
    itemsPerPageAllText: {
      type: String,
      default: "全部",
    },
    /* 每页数据数量选项 */
    itemsPerPageOptions: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200];
      },
    },
    /* 每页数据数量选择文本 */
    itemsPerPageText: {
      type: String,
      default: "每页显示数量",
    },
    /* 分页文本 */
    pageText: {
      type: String,
      default: "共 {2} 条数据",
    },
    /* 是否显示当前页数 */
    showCurrentPage: {
      type: Boolean,
      default: true,
    },
    /* 是否显示首页尾页 */
    showFirstLastPage: {
      type: Boolean,
      default: true,
    },

    /*
     * 默认表单相关属性
     * */
    dialogWidth: {
      type: Number,
      default: 640,
    },
    /* 新增数据表单标题 */
    dialogCreateTitle: {
      type: String,
      default() {
        return `新增${this.entityName}`;
      },
    },
    /* 修改数据表单标题 */
    dialogUpdateTitle: {
      type: String,
      default() {
        return `修改${this.entityName}`;
      },
    },
    /* 默认表单对象数据 */
    defaultDialogItem: {
      type: Object,
      default() {
        return {};
      },
    },
    /* 表单提交按钮文本 */
    submitText: {
      type: String,
      default: "提交",
    },

    /*
     * 多选操作相关属性
     * */

    /* 是否开启多选 */
    showSelect: {
      type: Boolean,
      default: false,
    },
    /* 多选框的颜色 */
    checkboxColor: {
      type: String,
    },
  },
  data() {
    return {
      items: [],
      selected: [],
      filter: {
        search: null,
        field: this.filterFields[0],
        showAdvance: false,
        /* 高级搜索对象 */
        advance: {},
      },
      status: {
        /* 是否在获取数据 */
        fetching: false,
        /* 是否在提交数据 */
        submitting: false,
      },
      pagination: {
        number: 0,
        size: 10,
        total: 0,
        sort: null,
      },
      footerProps: {
        disableItemsPerPage: this.disableItemsPerPage,
        disablePagination: this.disablePaginationButton,
        itemsPerPageAllText: this.itemsPerPageAllText,
        itemsPerPageOptions: this.itemsPerPageOptions,
        itemsPerPageText: this.itemsPerPageText,
        pageText: this.pageText,
        showCurrentPage: this.showCurrentPage,
        showFirstLastPage: this.showFirstLastPage,
      },
      dialog: {
        show: false,
        title: null,
        mode: null,
        submitText: this.submitText,
        item: { ...this.defaultDialogItem },
      },
      columnDialog: false,
      /* 要展示和隐藏的列 */
      tableHeaders: [],
    };
  },
  computed: {
    dataFetchApi() {
      /* 获取数据的接口地址 */
      if (this.fetchApi) {
        return this.fetchApi;
      } else {
        return this.api;
      }
    },
    dataCreateApi() {
      /* 新增数据的接口地址 */
      if (this.createApi) {
        return this.createApi;
      } else {
        return this.api;
      }
    },
    dataUpdateApi() {
      /* 修改数据的接口地址 */
      if (this.updateApi) {
        return this.updateApi;
      } else {
        return this.api;
      }
    },
    dataDeleteApi() {
      /* 删除数据的接口地址 */
      if (this.deleteApi) {
        return this.deleteApi;
      } else {
        return this.api;
      }
    },
    customColumns() {
      /* 计算需要自定义渲染的列 */
      return this.headers.filter((header) => header.slot).map((header) => `item.${header.value}`);
    },
    finalHeaders() {
      /* 计算真实需要显示的列 */
      return this.tableHeaders.filter((header) => header.visible);
    },
  },
  mounted() {
    /*
     * 计算是否有操作列
     * */
    if (!this.disableRowAction) {
      const headers = [...this.headers].map((h) => {
        return { ...h, visible: true };
      });
      headers.push({
        text: this.rowActionHeader,
        value: "actions",
        align: "center",
        sortable: false,
        visible: true,
      });
      this.tableHeaders = headers;
    } else {
      this.tableHeaders = [...this.headers].map((h) => {
        return { ...h, visible: true };
      });
    }
  },
  methods: {
    fetchItems(additionalSearchParams) {
      /*
       * 根据当前分页和过滤参数获取数据
       * */
      let params = {
        ...additionalSearchParams,
        page: this.pagination.number,
        size: this.pagination.size,
      };

      if (this.filter.showAdvance) {
        params = { ...params, ...this.filter.advance };
      } else {
        if (this.filter.search && this.filter.field) {
          params[this.filter.field.value] = this.filter.search;
        }
      }

      /*
       * 对过滤参数进行处理
       * */
      this.filterSerializer(params);

      this.status.fetching = true;
      this.$axios
        .get(this.dataFetchApi, {
          params,
          paramsSerializer: (p) => {
            let query = qs.stringify(p);
            if (this.pagination.sort) {
              query += `&${this.pagination.sort}`;
            }
            return query;
          },
        })
        .then((res) => {
          this.items = res.data.content;
          this.pagination.total = res.data.totalElements;
        })
        .finally(() => (this.status.fetching = false));
    },
    onPaginationChange(options) {
      /*
       * 当表格分页、排序、分组信息有变化时，重新获取数据
       * */
      this.pagination.number = options.page - 1;
      this.pagination.size = options.itemsPerPage;
      if (options.sortBy) {
        const sorts = [];
        for (let i = 0; i < options.sortBy.length; i++) {
          sorts.push(`sort=${options.sortBy[i]},${options.sortDesc[i] ? "desc" : "asc"}`);
        }
        this.pagination.sort = sorts.join("&");
      }
      this.fetchItems();
    },
    openCreateForm() {
      /*
       * 打开新增数据表单模态框
       * */
      this.dialog.title = this.dialogCreateTitle;
      this.dialog.item = { ...this.defaultDialogItem };
      this.dialog.show = true;
      this.dialog.mode = "create";
    },
    openUpdateForm(item) {
      /*
       * 打开新增数据表单模态框
       * */
      this.dialog.title = this.dialogUpdateTitle;
      this.dialog.item = item;
      this.dialog.show = true;
      this.dialog.mode = "update";
    },
    openDeleteDialog(items) {
      /*
       * 打开批量删除对话框
       * */
      this.openConfirmDialog(`删除${this.entityName}`, `确认要删除选中的 ${items.length} 条数据？`, {
        confirmText: "确认删除",
        confirmColor: "red",
      }).then(() => {
        this.$axios
          .delete(this.dataDeleteApi, {
            data: items.map((i) => i[this.entityIdField]),
          })
          .then(() => {
            this.selected = [];
            this.fetchItems();
          });
      });
    },
    openConfirmDialog(title, message, config) {
      /*
       * 打开确认对话框
       * */
      return this.$refs.confirm.open(title, message, config);
    },
    onSubmit() {
      /*
       * 执行数据表单的提交
       *
       * 根据是否有主键来判断是进行新增还是修改操作
       * */
      if (this.$refs.form.validate()) {
        this.status.submitting = true;
        this.dialog.submitText = `${this.submitText}中...`;

        if (this.dialog.mode === "update") {
          /* 包含主键字段，进行更新操作 */
          this.$axios
            .put(`${this.dataUpdateApi}/${this.dialog.item[this.entityIdField]}`, this.dialog.item)
            .then(() => {
              this.$refs.form.reset();
              this.dialog.show = false;
              this.$toast.global.success(`修改${this.entityName}成功`);
              this.fetchItems();
            })
            .finally(() => {
              this.dialog.submitText = this.submitText;
              this.status.submitting = false;
            });
        } else if (this.dialog.mode === "create") {
          /* 不包含主键字段，进行新增操作 */
          this.$axios
            .post(this.dataCreateApi, this.dialog.item)
            .then(() => {
              this.$refs.form.reset();
              this.dialog.show = false;
              this.$toast.global.success(`新增${this.entityName}成功`);
              this.fetchItems();
            })
            .finally(() => {
              this.dialog.submitText = this.submitText;
              this.status.submitting = false;
            });
        }
      }
    },
    resetAdvanceFilter() {
      this.filter.advance = { ...this.defaultAdvanceFilterParams };
      this.fetchItems();
    },
  },
};
</script>
