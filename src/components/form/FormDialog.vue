<!-- 通用表单模态框组件 -->
<template>
  <v-dialog :value="value" @input="$emit('input', $event)" :fullscreen="fullscreen" :persistent="persistent" :scrollable="scrollable" :width="dialogWidth">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind:attrs="attrs" v-bind:on="on" />
    </template>
    <form-card
      :icon="icon"
      :submit-color="submitColor"
      :submit-text="submitText"
      :submit-block="submitBlock"
      :subtitle="subtitle"
      :title="title"
      @submit="handleSubmit"
    >
      <slot />
      <template #formActions>
        <slot name="formActions" />
        <v-btn :color="cancelColor" text @click="handleCancel" v-text="cancelText" />
      </template>
    </form-card>
  </v-dialog>
</template>

<script>
import FormCard from "@/components/form/FormCard";

export default {
  name: "FormDialog",
  components: { FormCard },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    icon: {
      type: String,
    },
    cancelColor: {
      type: String,
      default: "grey",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    submitColor: {
      type: String,
      default: "primary",
    },
    submitText: {
      type: String,
      default: "提交",
    },
    submitBlock: {
      type: Boolean,
      default: false,
    },
    dialogWidth: {
      type: Number,
      default: 640,
    },
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleSubmit(status, form) {
      this.$emit("submit", status, form);
    },
  },
};
</script>

<style scoped></style>
