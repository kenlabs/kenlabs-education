<!-- 选择文本，根据值显示对应的文本 -->
<template>
  <span>
    <icon  v-if="icon" full-width x-small :icon="icon" :color="iconColor"/>
    <span :class="textColor" v-text="text" />
  </span>
</template>

<script>
import Icon from "~/components/common/Icon";
export default {
  name: "OptionText",
  components: { Icon },
  props: {
    value: String,
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    itemText: {
      type: String,
      default: "text"
    },
    itemTextColor: {
      type: String,
      default: "textColor"
    },
    itemValue: {
      type: String,
      default: "value"
    },
    itemIcon: {
      type: String,
      default: "icon"
    },
    itemIconColor: {
      type: String,
      default: "iconColor"
    }
  },
  computed: {
    item() {
      if (this.value) {
        return this.items.find(it => it[this.itemValue] === this.value);
      } else {
        return null;
      }
    },
    text() {
      if (this.item) {
        return this.item[this.itemText];
      }
    },
    textColor() {
      if (this.item) {
        return `${this.item[this.itemTextColor]}--text`;
      }
    },
    icon() {
      if (this.item) {
        return this.item[this.itemIcon];
      }
    },
    iconColor() {
      if (this.item) {
        return this.item[this.itemIconColor];
      }
    }
  }
};
</script>
