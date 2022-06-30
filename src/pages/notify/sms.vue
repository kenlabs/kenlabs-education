<template>
  <v-flex grow>
    <entity-table :headers="headers" api="/notify/sms" icon="message-sms" subtitle="记录了系统中的短信发送日志" title="短信日志" disable-row-action>
      <template #item.result="{ item }">
        <icon v-if="item.success" small color="green" icon="check" />
        <v-tooltip v-else bottom>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <icon small color="red" icon="exclamation-circle" />
            </v-btn>
          </template>
          <span v-text="item.message" />
        </v-tooltip>
      </template>
    </entity-table>
  </v-flex>
</template>

<script>
import EntityTable from "~/components/table/EntityTable";
import Icon from "~/components/common/Icon";

export default {
  components: { Icon, EntityTable },
  layout: "admin",
  head() {
    return {
      title: "短信日志",
    };
  },
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "手机号码",
          value: "mobile",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "短信签名",
          value: "signature",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "短信模板",
          value: "template",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "短信内容",
          value: "content",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "发送结果",
          value: "result",
          align: "center",
          sortable: false,
          divider: true,
          slot: true,
        },
        {
          text: "发送时间",
          value: "createAt",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
