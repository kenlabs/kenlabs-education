<!-- 复制按钮 -->
<template>
  <v-btn :disabled="disabled" :color="color" icon @click="copyToClipboard">
    <icon small :icon="icon" />
  </v-btn>
</template>

<script>
import Icon from "~/components/common/Icon";

export default {
  name: "CopyButton",
  components: { Icon },
  props: {
    content: String,
    disabled: Boolean,
    toast: String,
  },
  data() {
    return {
      status: {
        copied: false,
      },
    };
  },
  computed: {
    icon() {
      if (this.status.copied) {
        return "clipboard-check";
      } else {
        return "copy";
      }
    },
    color() {
      if (this.status.copied) {
        return "green";
      } else {
        return "blue";
      }
    },
  },
  methods: {
    copyToClipboard() {
      const vm = this;
      if (!vm.status.copied) {
        vm.$clipboard(this.content).then(() => {
          if (this.toast) {
            vm.$toast.global.success(vm.toast);
          }
          vm.status.copied = true;
          setTimeout(function () {
            vm.status.copied = false;
          }, 3000);
        });
      }
    },
  },
};
</script>
