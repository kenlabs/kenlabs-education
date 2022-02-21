<!-- 部门树组件 -->
<template>
  <v-card>
    <v-list-item>
      <v-list-item-icon>
        <icon :icon="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="title" />
        <v-list-item-subtitle v-text="subtitle" />
      </v-list-item-content>
      <v-list-item-action>
        <div class="d-flex">
          <v-btn v-permission:department:create icon small color="primary" @click="openCreateDialog">
            <icon small>plus</icon>
          </v-btn>
          <v-btn v-permission:department:update :disabled="!select" color="primary" icon small @click="openUpdateDialog">
            <icon small>edit</icon>
          </v-btn>
          <v-btn v-permission:department:delete :disabled="!select" color="red" icon small @click="openDeleteDialog">
            <icon small>trash-alt</icon>
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-skeleton-loader :loading="status.loading" type="list-item@7">
      <v-card-text>
        <v-treeview :items="departments" :disabled="status.loading" activatable dense hoverable open-all return-object transition @update:active="onChange" />
      </v-card-text>
    </v-skeleton-loader>
    <form-dialog
      v-model="dialog.show"
      :title="dialog.title"
      icon="sitemap"
      subtitle="部门可用于设置数据级别的访问权限，指定某些数据只能被某些部门访问"
      @submit="submit"
    >
      <v-row dense>
        <v-col cols="4">
          <v-autocomplete
            v-model="dialog.target.parent"
            dense
            outlined
            hide-details
            item-value="id"
            item-text="name"
            :items="departmentList"
            label="上级部门"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field v-model.trim="dialog.target.name" dense hide-details label="部门名称" outlined />
        </v-col>
        <v-col cols="4">
          <v-text-field v-model.number="dialog.target.sort" dense hide-details label="部门排序" outlined type="number" />
        </v-col>
      </v-row>
    </form-dialog>
    <confirm-dialog ref="confirm" />
  </v-card>
</template>
<script>
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormDialog from "@/components/form/FormDialog";
import Icon from "@/components/common/Icon";

export default {
  name: "DepartmentTree",
  components: { Icon, ConfirmDialog, FormDialog },
  props: {
    title: {
      type: String,
      default: "部门列表",
    },
    subtitle: {
      type: String,
      default: "点击以选择相关部门",
    },
    icon: {
      type: String,
      default: "sitemap",
    },
  },
  data: () => ({
    departments: [],
    status: {
      loading: false,
      submitting: false,
    },
    select: null,
    dialog: {
      show: false,
      title: null,
      default: {
        name: null,
        parent: null,
        sort: 0,
      },
      target: {
        name: null,
        parent: null,
        sort: 0,
      },
    },
  }),
  computed: {
    departmentList() {
      //  计算所有的部门列表
      let departments = [];
      this.departments.forEach((item) => {
        this.loadChildren(departments, item);
      });
      return departments;
    },
  },
  mounted() {
    this.fetchDepartments();
  },
  methods: {
    fetchDepartments() {
      this.status.loading = true;
      this.$axios.get("/departments").then((res) => {
        this.departments = res.data;
        this.status.loading = false;
      });
    },
    openCreateDialog() {
      this.dialog.title = "新增部门";
      this.dialog.target = { ...this.dialog.default };
      this.dialog.show = true;
    },
    openUpdateDialog() {
      this.dialog.title = "修改部门";
      this.dialog.target = this.select;
      this.dialog.show = true;
    },
    openDeleteDialog() {
      if (this.select.id) {
        this.$refs.confirm
          .open("删除部门", `确认要删除选中的部门 ${this.select.name} 吗？`, {
            confirmText: "确认删除",
            confirmColor: "red",
          })
          .then(() => {
            this.$axios
              .delete("/departments", {
                data: [this.select.id],
              })
              .then(() => {
                this.$toast.global.success("部门已删除");
                this.reset();
              });
          });
      }
    },
    loadChildren(list, department) {
      if (this.departments.select) {
        if (this.departments.select.id !== department.id) {
          list.push(department);
        }
      } else {
        list.push(department);
      }
      if (department.children && department.children.length) {
        department.children.forEach((item) => {
          this.loadChildren(list, item);
        });
      }
    },
    onChange(department) {
      if (department && department.length) {
        this.select = department[0];
      } else {
        this.select = null;
      }
      this.$emit("change", this.select);
    },
    submit(status, form) {
      if (this.dialog.target.id) {
        this.$axios.put(`/departments/${this.dialog.target.id}`, this.dialog.target).then(() => {
          this.$toast.global.success("部门已修改");
          this.reset(status, form);
        });
      } else {
        this.$axios.post("/departments", this.dialog.target).then(() => {
          this.$toast.global.success("部门已新增");
          this.reset(status, form);
        });
      }
    },
    reset(status, form) {
      if (status) {
        status.submitting = false;
      }
      if (form) {
        form.reset();
      }
      this.select = null;
      this.dialog.show = false;
      this.fetchDepartments();
    },
  },
};
</script>
