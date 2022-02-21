<!-- 通用确认对话框 -->
<template>
  <v-dialog v-model="dialog" :width="width" style="z-index: 700" @keydown.esc="cancel">
    <v-card>
      <v-card-title>
        <div v-text="text.title" />
        <v-spacer />
        <v-icon small color="orange" class="mr-1" v-text="config.icon" />
      </v-card-title>
      <template v-if="text.message">
        <v-divider />
        <v-card-text class="pt-3" v-text="text.message" />
      </template>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn text :color="config.cancelColor" :disabled="status.submitting" @click.native="cancel" v-text="config.cancelText" />
        <v-btn
          text
          :color="config.confirmColor"
          :disabled="status.submitting"
          :loading="status.submitting"
          @click.native="confirm"
          v-text="config.confirmText"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 480,
    },
    icon: {
      type: String,
      default: "fa fa-question-circle",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    cancelColor: {
      type: String,
      default: "grey",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    confirmColor: {
      type: String,
      default: "primary",
    },
  },
  data() {
    return {
      dialog: false,
      status: {
        submitting: false,
      },
      text: {
        title: null,
        message: null,
      },
      config: {
        width: this.width,
        icon: this.icon,
        cancelText: this.cancelText,
        cancelColor: this.cancelColor,
        confirmText: this.confirmText,
        confirmColor: this.confirmColor,
        onConfirm() {},
        onCancel() {},
      },
    };
  },
  methods: {
    open(title, message, config) {
      this.text = { title, message };
      this.config = Object.assign(this.config, config);
      this.dialog = true;
      return new Promise((resolve) => {
        this.config.onConfirm = resolve;
      });
    },
    confirm() {
      this.status.submitting = true;
      this.config.onConfirm();
      this.status.submitting = false;
      this.dialog = false;
    },
    cancel() {
      this.config.onCancel();
      this.dialog = false;
    },
  },
};
</script>
