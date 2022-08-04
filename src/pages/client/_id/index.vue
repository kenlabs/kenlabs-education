<template>
  <v-flex grow>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <card-info icon="folder-user" title="客户详情" subtitle="管理该客户的相关信息">
            <template #actions>
              <v-btn v-permission:client.query:contact text color="primary">查看联系方式</v-btn>
            </template>
          </card-info>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <card-info title="基本资料" subtitle="该客户的基本资料信息" />
          <v-divider />
          <list-info>
            <list-info-item v-if="client.owner" title="分配员工" :subtitle="client.owner.displayName" />
            <list-info-item title="客户昵称" :subtitle="client.nickname" />
            <list-info-item title="客户姓名" :subtitle="client.name" />
            <list-info-item title="性别" :subtitle="client.sex" />
            <list-info-item title="婚姻" :subtitle="client.marriage" />
            <list-info-item title="来源" :subtitle="client.source" />
            <list-info-item title="生日" :subtitle="client.birthday" />
            <list-info-item title="备注" :subtitle="client.remark" />
            <list-info-item title="生日详情" :subtitle="client.birthdayDetails" />
          </list-info>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <card-info title="客户订单" subtitle="该客户的订单信息">
            <template #actions>
              <v-btn v-permission:client.order:create text color="primary" @click="openOrderCreateDialog">开单</v-btn>
            </template>
          </card-info>
          <v-divider />
          <v-data-table :headers="order.headers" :items="order.items" :loading="order.loading" hide-default-footer>
            <template #item.money="{ item }">
              <span>{{ item.money | formatCurrency }}</span>
            </template>
            <template #item.actions="{ item }">
              <v-btn text color="primary" :to="`/client/order/${item.id}`">查看报告</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <form-dialog v-model="dialog.show" title="创建订单" subtitle="为该客户创建订单信息" @submit="createOrder">
      <v-row dense>
        <v-col cols="12">
          <text-field v-model="dialog.form.subject" label="问题描述" />
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="dialog.form.description" label="问题详情" :rows="4" dense outlined hide-details />
        </v-col>
        <v-col cols="4">
          <text-field v-model.number="dialog.form.money" label="订单金额（元）" />
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="dialog.form.payment"
            label="付款方式"
            :items="options.payments"
            dense
            outlined
            hide-details
            item-text="name"
            item-value="code"
          />
        </v-col>
        <v-col cols="4">
          <date-picker v-model="dialog.form.payedAt" label="付款日期" />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="dialog.form.labels"
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
          <text-field v-model.trim="dialog.form.remark" label="备注" />
        </v-col>
      </v-row>
    </form-dialog>
  </v-flex>
</template>

<script>
import CardInfo from "~/components/common/CardInfo";
import ListInfoItem from "~/components/common/ListInfoItem";
import ListInfo from "~/components/common/ListInfo";
import FormDialog from "~/components/form/FormDialog";
import TextField from "~/components/form/TextField";
import DatePicker from "~/components/form/DatePicker";

export default {
  components: { DatePicker, TextField, FormDialog, ListInfo, ListInfoItem, CardInfo },
  layout: "admin",
  asyncData(ctx) {
    const id = ctx.params.id;
    return { id };
  },
  head() {
    return {
      title: "客户详情",
    };
  },
  data() {
    return {
      client: {},
      options: {
        labels: [],
        payments: [],
      },
      dialog: {
        show: false,
        defaultForm: {
          subject: null,
          description: null,
          money: 0,
          payment: null,
          payedAt: null,
          remark: null,
          labels: [],
        },
        form: {},
      },
      order: {
        loading: false,
        items: [],
        headers: [
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
          {
            text: "操作",
            value: "actions",
            align: "center",
            sortable: false,
            slot: true,
          },
        ],
      },
    };
  },
  mounted() {
    this.$axios.get(`/client/${this.id}`).then((res) => {
      this.client = res.data;
      this.fetchOrders();
    });
    this.$axios.get("/property/dict/label").then((res) => {
      this.options.labels = res.data.items;
    });
    this.$axios.get("/property/dict/payment").then((res) => {
      this.options.payments = res.data.items;
    });
  },
  methods: {
    fetchOrders() {
      this.order.loading = true;
      this.$axios.get("/client/order", { params: { client: this.client.id, size: 100 } }).then((res) => {
        this.order.items = res.data.content;
        this.order.loading = false;
      });
    },
    openOrderCreateDialog() {
      this.dialog.form = { ...this.dialog.defaultForm };
      this.dialog.form.client = this.client;
      this.dialog.form.labels = [...this.client.labels];
      this.dialog.show = true;
    },
    createOrder(status, form) {
      this.$axios.post("/client/order", this.dialog.form).then(() => {
        status.submitting = false;
        form.reset();
        this.dialog.show = false;
        this.$toast.global.success("订单已创建");
        this.fetchOrders();
      });
    },
  },
};
</script>
