<template>
  <v-flex grow>
    <entity-table show-select ref="table" api="/client/order" icon="briefcase" title="订单管理" entity-name="订单" :headers="headers">
      <template #subtitle>
        <div>管理 <b>订单</b> 数据</div>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:client.order:query color="primary" small text :to="`/client/${item.client.id}`">查看客户</v-btn>
        <v-btn v-permission:client.order:update color="primary" small text @click="$refs.table.openUpdateForm(item)"> 修改 </v-btn>
        <v-btn v-permission:client.order:query small text color="primary" :to="`/client/order/${item.id}`">查看报告</v-btn>
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="12">
            <text-field v-model="item.subject" label="问题描述" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="item.description" label="问题详情" :rows="4" dense outlined hide-details />
          </v-col>
          <v-col cols="4">
            <text-field v-model.number="item.money" label="订单金额（元）" />
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="item.payment" label="付款方式" :items="options.payments" dense outlined hide-details item-text="name" item-value="code" />
          </v-col>
          <v-col cols="4">
            <date-picker v-model="item.payedAt" label="付款日期" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="item.labels"
              label="标签"
              :items="options.labels"
              multiple
              small-chips
              deletable-chips
              dense
              outlined
              hide-details
              item-text="name"
              item-value="code"
            />
          </v-col>
          <v-col cols="12">
            <text-field v-model.trim="item.remark" label="备注" />
          </v-col>
        </v-row>
      </template>
      <template #item.money="{ item }">
        <span>{{ item.money | formatCurrency }}</span>
      </template>
    </entity-table>
  </v-flex>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import DepartmentSelect from "@/components/form/DepartmentSelect";
import FormDialog from "@/components/form/FormDialog";
import TextField from "~/components/form/TextField";
import DatePicker from "~/components/form/DatePicker";
import AccountSelect from "~/components/form/AccountSelect";

export default {
  layout: "admin",
  components: { AccountSelect, DatePicker, TextField, FormDialog, EntityTable, DepartmentSelect },
  head() {
    return {
      title: "订单管理",
    };
  },
  data() {
    return {
      headers: [
        {
          text: "所属客户",
          value: "client.nickname",
          align: "center",
          sortable: false,
        },
        {
          text: "问题描述",
          value: "subject",
          align: "center",
        },
        {
          text: "订单金额",
          value: "money",
          align: "center",
          slot: true,
        },
        {
          text: "付款方式",
          value: "payment",
          align: "center",
        },
        {
          text: "付款日期",
          value: "payedAt",
          align: "center",
        },
        {
          text: "备注",
          value: "remark",
          align: "center",
        },
      ],
      options: {
        labels: [],
        payments: [],
      },
    };
  },
  mounted() {
    this.$axios.get("/property/dict/label").then((res) => {
      this.options.labels = res.data.items;
    });
    this.$axios.get("/property/dict/payment").then((res) => {
      this.options.payments = res.data.items;
    });
  },
  methods: {},
};
</script>
