<!-- 布尔值图标 -->
<template>
  <div class="d-inline-flex align-center">
    <icon small :icon="icon" :color="color" :left="text" />
    <div class="text-caption" v-text="text" />
  </div>
</template>

<script>
import Icon from "~/components/common/Icon";

export default {
  name: "BooleanIcon",
  components: { Icon },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    trueIcon: {
      type: String,
      default: "check",
    },
    trueColor: {
      type: String,
      default: "green",
    },
    trueText: {
      type: String,
    },
    falseIcon: {
      type: String,
      default: "circle-minus",
    },
    falseColor: {
      type: String,
      default: "grey",
    },
    falseText: {
      type: String,
    },
  },
  computed: {
    icon() {
      return this.value ? this.trueIcon : this.falseIcon;
    },
    color() {
      return this.value ? this.trueColor : this.falseColor;
    },
    text() {
      return this.value ? this.trueText : this.falseText;
    },
  },
};
</script>
