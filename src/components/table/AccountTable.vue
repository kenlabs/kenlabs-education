<!-- 账户管理表格组件 -->
<template>
  <entity-table
    ref="table"
    :filter-fields="filterFields"
    :headers="headers"
    api="/accounts"
    multi-sort
    entity-name="账户"
    icon="users"
    title="账户管理"
    subtitle="可以从部门列表筛选指定部门的账户，管理员可以为账户分配权限、角色或者修改账户基本信息"
  >
    <template #tableActions>
      <v-btn v-permission:account:create color="primary" text @click="$refs.table.openCreateForm()">新增账户</v-btn>
      <v-btn v-permission:account.statistic:query color="green" text @click="$emit('statistic')">统计数据</v-btn>
    </template>
    <template #rowActions="{ item }">
      <v-btn v-permission:account:update :to="`/accounts/${item.id}`" color="primary" small text>查看</v-btn>
    </template>
    <template #item.avatar="{ item }">
      <avatar :value="item" />
    </template>
    <template #item.status="{ item }">
      <v-icon v-if="item.enabled" color="green" x-small>fa fa-check</v-icon>
      <v-icon v-else color="orange" x-small>fa fa-user-lock</v-icon>
    </template>
    <template #item.admin="{ item }">
      <icon v-if="item.admin" color="red" fade small>user-cog</icon>
      <icon v-else-if="item.authorities.length > 0" color="green" small>user-lock</icon>
      <icon v-else color="black" small>user</icon>
    </template>
    <template #item.loginAt="{ item }">
      <v-list-item dense two-line>
        <v-list-item-content>
          <v-list-item-subtitle v-if="item.loginAt" class="d-flex">
            <icon x-small left full-width>right-to-bracket</icon>
            <div v-text="item.loginAt" />
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="item.createAt" class="d-flex">
            <icon x-small left full-width>calendar-plus</icon>
            <div v-text="item.createAt" />
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #form="{ item }">
      <v-row dense>
        <v-col cols="6">
          <v-text-field v-model="item.username" :counter="32" dense label="用户名" outlined />
        </v-col>
        <v-col cols="6">
          <department-select v-model="item.department" dense hide-details label="所在部门" outlined />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="item.password" :counter="32" dense label="登录密码" outlined type="password" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="item.passwordConfirm" :counter="32" dense label="确认密码" outlined type="password" />
        </v-col>
      </v-row>
    </template>
  </entity-table>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import DepartmentSelect from "@/components/form/DepartmentSelect";
import Icon from "@/components/common/Icon";
import Avatar from "@/components/common/Avatar";

export default {
  name: "AccountTable",
  components: { Avatar, Icon, EntityTable, DepartmentSelect },
  data() {
    return {
      filterFields: [
        {
          name: "综合",
          desc: "用户名 手机号 邮箱 姓名 昵称 综合搜索",
          value: "name",
        },
        {
          name: "用户名",
          desc: "账户用户名模糊搜索",
          value: "username",
        },
        {
          name: "手机号",
          desc: "账户手机号模糊搜索",
          value: "mobile",
        },
        {
          name: "邮箱",
          desc: "账户邮箱模块搜索",
          value: "email",
        },
        {
          name: "昵称",
          desc: "账户昵称模块搜索",
          value: "nickname",
        },
        {
          name: "姓名",
          desc: "账户姓名模块搜索",
          value: "name",
        },
        {
          name: "备注",
          desc: "账户备注信息搜索",
          value: "remark",
        },
      ],
      headers: [
        {
          text: "头像",
          value: "avatar",
          align: "center",
          sortable: false,
          slot: true,
          width: 1,
        },
        {
          text: "昵称",
          value: "nickname",
          align: "center",
          sortable: false,
        },
        {
          text: "权限",
          value: "admin",
          align: "center",
          divider: true,
          slot: true,
        },
        {
          text: "手机号",
          value: "mobile",
          align: "center",
          sortable: false,
        },
        {
          text: "邮箱",
          value: "email",
          align: "center",
          sortable: false,
        },
        {
          text: "备注",
          value: "remark",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "状态",
          value: "status",
          align: "center",
          slot: true,
          sortable: false,
          divider: true,
        },
        {
          text: "时间",
          value: "loginAt",
          align: "center",
          sortable: true,
          slot: true,
          divider: true,
          width: 1,
        },
      ],
    };
  },
};
</script>
