<!-- 时间选择组件 -->
<template>
  <v-dialog ref="dialog" v-model="dialog.show" persistent :width="width" :return-value.sync="time">
    <template #activator="{ on, attrs }">
      <v-text-field v-bind="attrs" v-on="on" readonly dense outlined hide-details :label="label" :disabled="disabled" :value="value" />
    </template>
    <v-time-picker
      v-model="time"
      scrollable
      flat
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      :allowed-seconds="allowedSeconds"
      :ampm-in-title="ampmInTitle"
      :color="color"
      :header-color="headerColor"
      :format="format"
      :landscape="landscape"
      :multiple="multiple"
      :min="min"
      :max="max"
      :no-title="noTitle"
      :readonly="readonly"
      :use-seconds="useSeconds"
      locale="zh-cn"
    >
      <v-spacer />
      <v-btn text v-if="clearable" color="red" @click="clearValue">清除</v-btn>
      <v-btn text color="grey" @click="dialog.show = false">取消</v-btn>
      <v-btn text color="primary" @click="confirmChange">确认</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "TimePicker",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: "选择时间",
    },
    width: {
      type: Number,
      default: 300,
    },
    allowedHours: {},
    allowedMinutes: {},
    allowedSeconds: {},
    ampmInTitle: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    headerColor: {
      type: String,
      default: "primary",
    },
    format: {
      type: String,
      default: "ampm",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    landscape: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    noTitle: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    useSeconds: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      time: this.value,
      dialog: {
        show: false,
      },
    };
  },
  methods: {
    confirmChange() {
      this.$refs.dialog.save(this.time);
      this.$emit("input", this.time);
      this.dialog.show = false;
    },
    clearValue() {
      this.$emit("input", null);
      this.time = null;
      this.dialog.show = false;
    },
  },
};
</script>
