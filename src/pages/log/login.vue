<template>
  <div class="flex-grow-1">
    <entity-table
      :filter-fields="filterFields"
      :headers="headers"
      api="/log/login"
      disable-row-action
      icon="user-clock"
      multi-sort
      subtitle="记录了账户登录系统的信息"
      title="登录日志"
    >
      <template #item.avatar="{ item }">
        <avatar :value="item" size="32" />
      </template>
      <template v-slot:item.type="{ item }">
        <v-icon v-if="item.type === 'LOGIN'" color="green" small>fa fa-sign-in-alt</v-icon>
        <v-icon v-if="item.type === 'LOGOUT'" color="orange" small>fa fa-sign-out-alt</v-icon>
        <v-icon v-if="item.type === 'FORCE_LOGOUT'" color="red" small>fa fa-sign-out-alt</v-icon>
      </template>
    </entity-table>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import Avatar from "@/components/common/Avatar";

export default {
  layout: "admin",
  components: { Avatar, EntityTable },
  head() {
    return {
      title: "登录日志",
    };
  },
  data() {
    return {
      filterFields: [
        {
          name: "账户名称",
          desc: "搜索登录账户的名称",
          value: "displayName",
        },
        {
          name: "IP地址",
          desc: "IP地址搜索",
          value: "ip",
        },
        {
          name: "浏览器",
          desc: "浏览器搜索",
          value: "browser",
        },
      ],
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "头像",
          value: "avatar",
          align: "center",
          sortable: false,
          divider: true,
          slot: true,
          width: 1,
        },
        {
          text: "账户",
          value: "displayName",
          align: "center",
        },
        {
          text: "类型",
          value: "type",
          align: "center",
          width: 96,
          slot: true,
        },
        {
          text: "浏览器",
          value: "browser",
          align: "center",
        },
        {
          text: "IP地址",
          value: "ip",
          align: "center",
        },
        {
          text: "时间",
          value: "createAt",
          align: "center",
        },
      ],
    };
  },
};
</script>
