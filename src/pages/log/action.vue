<template>
  <div class="flex-grow-1">
    <entity-table
      :filter-fields="filterFields"
      :headers="headers"
      api="/log/action"
      icon="user-edit"
      multi-sort
      subtitle="记录了系统中的账户执行操作的历史信息"
      title="操作日志"
    >
      <template #item.avatar="{ item }">
        <v-img :src="item.avatar" class="rounded-lg" max-height="32" max-width="32" />
      </template>
      <template #item.status="{ item }">
        <v-icon v-if="item.success" small color="green">fa fa-check</v-icon>
        <v-icon v-else small color="red">fa fa-exclamation-circle</v-icon>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:log:query color="primary" small text @click="openLogDialog(item)">日志详情</v-btn>
      </template>
    </entity-table>
    <v-dialog v-model="dialog.show" width="640">
      <v-card>
        <card-info icon="file-invoice" subtitle="查看日志的详细信息" :title="dialog.item.description" />
        <v-divider />
        <v-card-text>
          <list-info>
            <list-info-item title="ID" :subtitle="dialog.item.id" />
            <list-info-item title="操作名称" :subtitle="dialog.item.description" />
            <list-info-item title="执行账户" :subtitle="dialog.item.executedBy" />
            <list-info-item title="浏览器" :subtitle="dialog.item.browser" />
            <list-info-item title="IP地址" :subtitle="dialog.item.ip" />
            <list-info-item title="调用接口" :subtitle="dialog.item.url" />
            <list-info-item title="调用方法" :subtitle="dialog.item.method" />
            <list-info-item title="请求参数" :subtitle="dialog.item.parameters" />
            <list-info-item title="执行结果">
              <template #subtitle>
                <icon v-if="dialog.item.success" color="green" small>check</icon>
                <icon v-else small color="red">exclamation-circle</icon>
              </template>
            </list-info-item>
            <list-info-item v-if="!dialog.item.success" title="失败原因" :subtitle="dialog.item.exception" />
            <list-info-item title="操作耗时" :subtitle="dialog.item.durationText" />
            <list-info-item title="操作时间" :subtitle="dialog.item.createAt" />
          </list-info>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import CardInfo from "@/components/common/CardInfo";
import ListInfo from "@/components/common/ListInfo";
import ListInfoItem from "@/components/common/ListInfoItem";
import Icon from "@/components/common/Icon";

export default {
  layout: "admin",
  components: { Icon, ListInfoItem, ListInfo, CardInfo, EntityTable },
  head() {
    return {
      title: "操作日志",
    };
  },
  data() {
    return {
      filterFields: [
        {
          name: "执行账户",
          desc: "执行账户名称模糊搜索",
          value: "executedBy",
        },
        {
          name: "操作名称",
          desc: "操作名称模糊搜索",
          value: "description",
        },
        {
          name: "执行方法",
          desc: "执行方法名称搜索",
          value: "method",
        },
        {
          name: "执行参数",
          desc: "执行参数内容搜索",
          value: "parameters",
        },
        {
          name: "执行地址",
          desc: "执行地址模糊搜索",
          value: "url",
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
          text: "执行账户",
          value: "executedBy",
          align: "center",
        },
        {
          text: "操作名称",
          value: "description",
          align: "center",
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
          divider: true,
        },
        {
          text: "结果",
          value: "status",
          align: "center",
          divider: true,
          sortable: false,
          slot: true,
          width: 1,
        },
        {
          text: "操作耗时",
          value: "durationText",
          align: "center",
          sortable: false,
        },
        {
          text: "操作时间",
          value: "createAt",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
      dialog: {
        show: false,
        item: {},
      },
    };
  },
  methods: {
    openLogDialog(log) {
      this.dialog.item = log;
      this.dialog.show = true;
    },
  },
};
</script>
