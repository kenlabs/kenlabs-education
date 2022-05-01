<!-- 优惠券管理页面 -->
<template>
  <div class="flex-grow-1">
    <entity-table
      show-select
      ref="table"
      api="/coupon/batch"
      icon="ticket"
      title="优惠券管理"
      subtitle="管理和查看系统优惠券"
      :default-dialog-item="defaultDialogItem"
      :headers="headers"
    >
      <template #tableActions>
        <v-btn v-permission:coupon.batch:create color="primary" text @click="$refs.table.openCreateForm()">发放优惠券</v-btn>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:coupon.batch:update color="primary" small text @click="$refs.table.openUpdateForm(item)"> 修改 </v-btn>
        <v-btn
          v-permission:coupon.batch:update
          color="green"
          small
          text
          @click="
            dialog.increase = true;
            dialog.show = true;
            dialog.item = item;
          "
        >
          增发
        </v-btn>
        <v-btn
          v-permission:coupon.batch:update
          color="red"
          small
          text
          @click="
            dialog.increase = false;
            dialog.show = true;
            dialog.item = item;
          "
        >
          销毁
        </v-btn>
      </template>
      <template #batchActions="{ selected }">
        <v-btn v-permission:coupon.batch:delete :disabled="!selected.length" color="red" text @click="$refs.table.openDeleteDialog(selected)"> 删除 </v-btn>
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="6">
            <text-field v-model="item.title" label="批次标题" placeholder="该批次优惠券的统一名称" />
          </v-col>
          <v-col cols="6">
            <v-radio-group v-model="item.scene" dense hide-details row label="使用场景" class="mt-0">
              <v-radio v-for="it in options.scenes" :key="it.value" :value="it.value" :label="it.text" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <text-field v-model="item.subtitle" label="描述子标题" placeholder="该批次的描述信息" />
          </v-col>
          <v-col cols="6">
            <text-field v-model.number="item.amount" label="优惠金额" suffix="分" type="number" />
          </v-col>
          <v-col cols="6">
            <text-field v-if="!item.id" v-model.number="item.initAmount" label="发放数量" suffix="张" type="number" />
          </v-col>
          <v-col cols="6">
            <v-radio-group v-model="item.expireType" dense hide-details row label="过期类型" class="mt-0">
              <v-radio v-for="it in options.expireTypes" :key="it.value" :value="it.value" :label="it.text" />
            </v-radio-group>
          </v-col>
          <v-col v-if="item.expireType === 'DELAY'" cols="6">
            <text-field v-model.number="item.expireAmount" label="过期时间" suffix="天" type="number" />
          </v-col>
          <v-col v-if="item.expireType === 'FIX'" cols="6">
            <date-picker v-model="item.expireAt" label="过期日期" @input="item.expireAt = item.expireAt + ' 00:00:00'" />
          </v-col>
          <v-col cols="6">
            <text-field
              v-model.number="item.maxDraw"
              label="最大领取数量"
              :hide-details="false"
              hint="每个账户在该批次中最多领取优惠券数量"
              suffix="张"
              type="number"
            />
          </v-col>
          <v-col cols="6">
            <text-field
              v-model.number="item.maxUse"
              :hide-details="false"
              label="单个订单最大使用数量"
              hint="每个订单最多可以使用该批次的优惠券张数"
              suffix="张"
              type="number"
            />
          </v-col>
        </v-row>
      </template>
      <template #item.info="{ item }">
        <v-list-item dense>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
            <v-list-item-subtitle v-text="item.subtitle" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <template #item.expire="{ item }">
        <div v-if="item.expireType === 'DELAY'">顺延：{{ item.expireAmount }}天</div>
        <div v-else v-text="item.expireAt" />
      </template>
      <template #item.usage="{ item }">
        <div><strong v-text="item.currentCount" /> / <strong v-text="item.totalCount" /></div>
      </template>
      <template #item.amount="{ item }">
        <strong class="orange--text">￥ {{ item.amount / 100 }}</strong>
      </template>
      <template #item.state="{ item }">
        <v-switch v-model="item.enabled" @change="updateState(item)" />
      </template>
    </entity-table>
    <form-dialog
      v-model="dialog.show"
      icon="ticket"
      title="增发|销毁优惠券批次"
      subtitle="修改该批次优惠券可领取的数量，如果销毁优惠券的数量大于已领取的数量，则已领取的优惠券不会受到影响"
      @submit="updateAmount"
    >
      <v-row dense>
        <v-col cols="12">
          <text-field v-model.number="dialog.amount" label="增加或销毁的优惠券数量" type="number" />
        </v-col>
      </v-row>
    </form-dialog>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import TextField from "@/components/form/TextField";
import DatePicker from "@/components/form/DatePicker";
import TimePicker from "@/components/form/TimePicker";
import FormDialog from "@/components/form/FormDialog";

export default {
  components: { FormDialog, TimePicker, DatePicker, TextField, EntityTable },
  layout: "admin",
  head() {
    return { title: "优惠券管理" };
  },
  data() {
    return {
      headers: [
        {
          text: "批次信息",
          value: "info",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "过期时间",
          value: "expire",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "用量",
          value: "usage",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "优惠金额（元）",
          value: "amount",
          align: "center",
          sortable: false,
          slot: true,
          divider: true,
        },
        {
          text: "状态",
          value: "state",
          align: "center",
          sortable: false,
          slot: true,
          divider: true,
          width: 1,
        },
      ],
      defaultDialogItem: {
        scene: "DEDUCTION",
        expireType: "DELAY",
        amount: 0,
        initAmount: 0,
        maxDraw: 1,
        maxUse: 1,
        expireAmount: 7,
        timeUnit: "DAYS",
      },
      options: {
        scenes: [
          { text: "直接抵扣", value: "DEDUCTION" },
          //{ text: "满减", value: "FULL_REDUCTION" },
        ],
        expireTypes: [
          { text: "顺延", value: "DELAY" },
          { text: "固定", value: "FIX" },
        ],
      },
      dialog: {
        show: false,
        amount: 0,
        increase: false,
        item: {},
      },
    };
  },
  methods: {
    updateState(item) {
      if (item.enabled) {
        this.$axios.put(`/coupon/batch/${item.id}/enable`).then(() => {
          this.$toast.global.success("优惠券已上架");
          this.$refs.table.fetchItems();
        });
      } else {
        this.$refs.table.openConfirmDialog("下架优惠券", "下架后该优惠券将无法被领取，已领取的可以继续使用，是否确认下架？").then(() => {
          this.$axios.put(`/coupon/batch/${item.id}/disable`).then(() => {
            this.$toast.global.success("优惠券批次已下架");
            this.$refs.table.fetchItems();
          });
        });
      }
    },
    updateAmount(status, form) {
      if (this.dialog.increase) {
        this.$axios.put(`/coupon/batch/${this.dialog.item.id}/increase`, { amount: this.dialog.amount }).then(() => {
          this.$toast.global.success("优惠券增发成功");
          this.$refs.table.fetchItems();
          status.submitting = false;
          this.dialog.show = false;
          form.reset();
        });
      } else {
        this.$axios.put(`/coupon/batch/${this.dialog.item.id}/decrease`, { amount: this.dialog.amount }).then(() => {
          this.$toast.global.success("优惠券销毁成功");
          this.$refs.table.fetchItems();
          status.submitting = false;
          this.dialog.show = false;
          form.reset();
        });
      }
    },
  },
};
</script>

<style scoped></style>
