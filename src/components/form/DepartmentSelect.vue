<!-- 部门选择组件 -->
<template>
  <v-autocomplete
    item-text="name"
    item-value="id"
    outlined
    dense
    hide-details
    :hint="hint"
    :label="label"
    :disabled="loading"
    :loading="loading"
    :items="departmentList"
    :multiple="multiple"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: "DepartmentSelect",
  props: {
    label: {
      type: String,
      default: "部门",
    },
    hint: {
      type: String,
      default: "请选择部门",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number | Array,
    },
  },
  data: () => ({
    loading: false,
    items: [],
  }),
  computed: {
    departmentList() {
      //  计算所有的部门列表
      let departments = [];
      this.items.forEach((item) => {
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
      this.loading = true;
      this.$axios.get("/departments").then((res) => {
        this.items = res.data;
        this.loading = false;
      });
    },
    loadChildren(list, department) {
      list.push(department);

      if (department.children && department.children.length) {
        department.children.forEach((item) => {
          this.loadChildren(list, item);
        });
      }
    },
  },
};
</script>

<style scoped></style>
