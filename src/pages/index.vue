<template>
  <div class="flex-grow-1">
    <v-icon color="red" @click="toast">fa-heart fa-beat</v-icon>
  </div>
</template>

<script>
export default {
  methods: {
    toast() {
      this.$toast.global.info("信息");
      this.$toast.global.success("成功");
      this.$toast.global.error("失败");
    },
  },
};
</script>
