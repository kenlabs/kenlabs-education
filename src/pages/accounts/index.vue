<!-- 系统账户管理页面 -->
<template>
  <div class="flex-grow-1 d-flex">
    <department-tree class="mr-4" @change="onDepartmentChange" />
    <div class="flex-grow-1">
      <account-table ref="accountTable" />
    </div>
  </div>
</template>
<script>
import DepartmentTree from "@/components/form/DepartmentTree";
import AccountTable from "@/components/table/AccountTable";

export default {
  components: { AccountTable, DepartmentTree },
  layout: "admin",
  head() {
    return {
      title: "账户管理",
    };
  },
  methods: {
    onDepartmentChange(value) {
      if (value) {
        this.$refs.accountTable.$refs.table.fetchItems({
          department: value.id,
        });
      } else {
        this.$refs.accountTable.$refs.table.fetchItems();
      }
    },
  },
};
</script>
