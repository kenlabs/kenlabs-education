<!-- 日期选择组件 -->
<template>
  <v-dialog ref="dialog" v-model="dialog.show" persistent :width="width" :return-value.sync="date">
    <template #activator="{ on, attrs }">
      <v-text-field v-bind="attrs" v-on="on" readonly dense outlined hide-details :label="label" :disabled="disabled" :value="value" />
    </template>
    <v-date-picker
      v-model="date"
      scrollable
      flat
      :allowed-dates="allowedDates"
      :color="color"
      :header-color="headerColor"
      :day-format="dayFormat"
      :first-day-of-week="firstDayOfWeek"
      :landscape="landscape"
      :multiple="multiple"
      :no-title="noTitle"
      :range="range"
      :readonly="readonly"
      :show-adjacent-months="showAdjacentMonths"
      :show-current="showCurrent"
      :show-week="showWeek"
      :type="type"
      locale="zh-cn"
    >
      <v-spacer />
      <v-btn text v-if="clearable" color="red" @click="clearValue">清除</v-btn>
      <v-btn text color="grey" @click="dialog.show = false">取消</v-btn>
      <v-btn text color="primary" @click="confirmChange">确认</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: "选择日期",
    },
    width: {
      type: Number,
      default: 300,
    },
    allowedDates: {
      type: Function,
      default() {
        return true;
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    headerColor: {
      type: String,
      default: "primary",
    },
    dayFormat: {
      type: Function,
      default(day) {
        return moment(day).format("DD");
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    firstDayOfWeek: {
      type: Number,
      default: 0,
    },
    landscape: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    noTitle: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showAdjacentMonths: {
      type: Boolean,
      default: true,
    },
    showCurrent: {
      type: Boolean,
      default: true,
    },
    showWeek: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "date",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      date: this.value,
      dialog: {
        show: false,
      },
    };
  },
  methods: {
    confirmChange() {
      this.$refs.dialog.save(this.date);
      this.$emit("input", this.date);
      this.dialog.show = false;
    },
    clearValue() {
      this.$emit("input", null);
      this.date = null;
      this.dialog.show = false;
    },
  },
};
</script>

<style scoped></style>
