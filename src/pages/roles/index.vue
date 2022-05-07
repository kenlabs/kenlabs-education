<!-- 角色管理页面 -->
<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-skeleton-loader :loading="permission.status.loading" type="table">
      <entity-table
        show-select
        ref="table"
        api="/roles"
        icon="id-card"
        title="角色管理"
        entity-name="角色"
        :filter-fields="filterFields"
        :headers="headers"
        :default-dialog-item="defaultDialogItem"
      >
        <template #subtitle>
          <div>角色拥有 <b>数据访问级别</b> 和 <b>权限</b>，可以分配给账户。拥有该角色的账户会自动获得该角色的数据访问级别和权限。</div>
        </template>
        <template #tableActions>
          <v-btn v-permission:role:create color="primary" text @click="$refs.table.openCreateForm()">新增角色</v-btn>
        </template>
        <template #rowActions="{ item }">
          <v-btn v-permission:role:update color="primary" small text @click="$refs.table.openUpdateForm(item)">修改 </v-btn>
          <v-btn v-permission:role:update color="primary" small text @click="openPermissionDialog(item)">分配权限</v-btn>
        </template>
        <template #batchActions="{ selected }">
          <v-btn v-permission:role:delete :disabled="!selected.length" color="red" text @click="$refs.table.openDeleteDialog(selected)"> 删除 </v-btn>
        </template>
        <template #item.dataScope="{ item }"> {{ parseDataScopeText(item) }}</template>
        <template #item.permissions="{ item }"> {{ item.permissions.length }}</template>
        <template #form="{ item }">
          <v-row dense>
            <v-col cols="3">
              <v-text-field v-model.trim="item.name" dense outlined label="角色名称" :counter="60" :rules="[(v) => !!v || '角色名称不能为空']" />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model.trim="item.remark" dense outlined label="角色备注" :counter="60" />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model.number="item.sort" type="number" dense outlined label="角色排序" />
            </v-col>
            <v-col cols="3">
              <v-autocomplete v-model="item.dataScope" dense outlined label="角色数据访问" :items="dataScopes" />
            </v-col>
            <v-col v-if="item.dataScope === 'CUSTOM'" cols="12">
              <department-select v-model="item.departments" multiple label="角色自定义部门" />
            </v-col>
          </v-row>
        </template>
      </entity-table>
    </v-skeleton-loader>
    <form-dialog v-model="permission.dialog.show" icon="lock-keyhole" title="分配权限" subtitle="请选择要为该角色分配的权限" @submit="submitPermissions">
      <v-treeview
        v-model="permission.dialog.item.permissions"
        dense
        hoverable
        item-key="id"
        item-text="name"
        open-on-click
        selectable
        selection-type="independent"
        transition
        :items="permission.items"
      />
      <template #formActions>
        <div class="text-caption font-weight-bold grey--text mr-2">
          {{ `已选择 ${permission.dialog.item.permissions ? permission.dialog.item.permissions.length : 0} 项权限` }}
        </div>
      </template>
    </form-dialog>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import DepartmentSelect from "@/components/form/DepartmentSelect";
import FormDialog from "@/components/form/FormDialog";

export default {
  layout: "admin",
  components: { FormDialog, EntityTable, DepartmentSelect },
  head() {
    return {
      title: "角色管理",
    };
  },
  data() {
    return {
      defaultDialogItem: {
        name: null,
        remark: null,
        sort: 0,
        dataScope: "SELF",
      },
      filterFields: [
        {
          name: "角色名称",
          desc: "输入角色名称模糊搜索",
          value: "name",
        },
        {
          name: "角色备注",
          desc: "输入角色备注模糊搜索",
          value: "remark",
        },
      ],
      dataScopes: [
        {
          text: "所有部门",
          value: "ALL",
        },
        {
          text: "本部门及下级部门",
          value: "DEPARTMENT_AND_LOWER",
        },
        {
          text: "仅本部门",
          value: "DEPARTMENT_ONLY",
        },
        {
          text: "仅本人",
          value: "SELF",
        },
        {
          text: "自定义",
          value: "CUSTOM",
        },
      ],
      headers: [
        {
          text: "角色名称",
          value: "name",
          align: "center",
        },
        {
          text: "角色排序",
          value: "sort",
          align: "center",
        },
        {
          text: "数据访问级别",
          value: "dataScope",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "权限数量",
          value: "permissions",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "角色备注",
          value: "remark",
          align: "center",
          sortable: false,
        },
      ],
      permission: {
        status: {
          loading: false,
          submitting: false,
        },
        items: [],
        selected: [],
        dialog: {
          show: false,
          item: {},
        },
      },
    };
  },
  mounted() {
    this.fetchPermissions();
  },
  methods: {
    fetchPermissions() {
      /*
       * 加载所有系统权限树形结果
       * */
      this.permission.status.loading = true;
      this.$axios
        .get("/permissions")
        .then((res) => {
          this.permission.items = res.data;
        })
        .finally(() => {
          this.permission.status.loading = false;
        });
    },
    parseDataScopeText(item) {
      const scope = this.dataScopes.find((scope) => scope.value === item.dataScope);
      if (scope) {
        return scope.text;
      } else {
        return "-";
      }
    },
    openPermissionDialog(role) {
      this.permission.dialog.show = true;
      this.permission.dialog.item = role;
    },
    submitPermissions() {
      this.permission.status.submitting = true;
      this.$axios
        .put(`/roles/${this.permission.dialog.item.id}`, this.permission.dialog.item)
        .then(() => {
          this.$refs.table.fetchItems();
          this.permission.dialog.show = false;
        })
        .finally(() => {
          this.permission.status.submitting = false;
        });
    },
  },
};
</script>
