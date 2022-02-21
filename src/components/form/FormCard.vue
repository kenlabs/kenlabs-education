<!-- 通用表单卡片组件，用于快速创建表单内容 -->
<template>
  <v-card>
    <!-- 表单信息组件 -->
    <v-list-item>
      <v-list-item-icon v-if="icon">
        <v-icon v-text="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          <div v-if="title" v-text="title" />
          <slot name="title" />
        </v-list-item-title>
        <v-list-item-subtitle>
          <div v-if="subtitle" v-text="subtitle" />
          <slot name="subtitle" />
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="d-flex flex-row">
        <slot name="infoActions" />
      </v-list-item-action>
    </v-list-item>
    <v-divider class="mb-2" />
    <v-card-text>
      <v-form ref="form" :disabled="status.submitting || disabled">
        <slot />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <slot name="formActions" />
      <v-btn :color="submitColor" :disabled="status.submitting" :loading="status.submitting" text @click="handleSubmit" v-text="submitText" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FormCard",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    icon: {
      type: String,
    },
    submitColor: {
      type: String,
      default: "primary",
    },
    submitText: {
      type: String,
      default: "提交",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: {
        submitting: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.status.submitting = true;
        /* 表单的提交状态交给回调函数来处理 */
        this.$emit("submit", this.status, this.$refs.form);
      }
    },
  },
};
</script>

<style scoped></style>
