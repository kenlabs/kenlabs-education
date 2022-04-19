<!-- 列表信息展示组件子项 -->
<template>
  <v-list-item dense :disabled="disabled">
    <v-list-item-icon v-if="icon" class="align-self-center">
      <icon full-width :icon="icon" :color="iconColor" />
    </v-list-item-icon>
    <v-list-item-icon v-if="advanceIcon" class="align-self-center">
      <slot name="icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title :class="{ 'text-wrap': wrapTitle }">
        {{ title }}
        <slot name="title" />
      </v-list-item-title>
      <v-list-item-subtitle :class="{ 'text-wrap': wrapSubtitle }">
        {{ subtitle }}
        <slot name="subtitle" />
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action-text v-text="text" />
    <v-list-item-action>
      <slot name="actions" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Icon from "@/components/common/Icon";

export default {
  name: "ListInfoItem",
  components: { Icon },
  props: {
    icon: String,
    iconColor: String,
    title: String | Number,
    subtitle: String | Number,
    text: String | Number,
    advanceIcon: Boolean,
    disabled: Boolean,
    wrapTitle: Boolean,
    wrapSubtitle: Boolean,
  },
};
</script>
