<!-- 头像组件 -->
<template>
  <v-avatar :size="size">
    <v-img v-if="image" :src="result" />
  </v-avatar>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    value: String | Object,
    image: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number | String,
      default: 48,
    },
  },
  computed: {
    result() {
      if (this.value) {
        if (this.value instanceof String) {
          return this.value;
        } else {
          return this.value.avatar;
        }
      } else {
        return "";
      }
    },
  },
};
</script>
