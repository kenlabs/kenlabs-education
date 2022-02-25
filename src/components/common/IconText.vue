<!-- 带图标的文本组件 -->
<template>
  <div class="d-inline-flex align-center">
    <icon v-if="icon" full-width x-small :color="color" :icon="icon" />
    <slot name="icon" />
    <slot />
  </div>
</template>

<script>
import Icon from "~/components/common/Icon";

export default {
  name: "IconText",
  components: { Icon },
  props: {
    icon: String,
    color: String,
    advanceIcon: Boolean,
  },
};
</script>

<style scoped lang="scss">
i.v-icon {
  margin-right: 4px;
}
</style>
