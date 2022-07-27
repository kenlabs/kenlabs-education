<!-- 无数据文本 -->
<template>
  <v-sheet class="d-flex flex-column align-center">
    <icon full-width x-large :icon="icon" color="grey" class="mt-4" />
    <div class="text-caption grey--text my-2" v-text="text" />
  </v-sheet>
</template>

<script>
import Icon from "@/components/common/Icon";
export default {
  name: "EmptyText",
  components: { Icon },
  props: {
    icon: String,
    text: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>
