<!-- 卡片信息组件 -->
<template>
  <v-list>
    <v-list-item>
      <v-list-item-icon v-if="icon">
        <icon :icon="icon" :color="iconColor" :small="small" :x-small="xSmall" :full-width="fullWidth" :large="large" :x-large="xLarge" />
      </v-list-item-icon>
      <v-list-item-icon v-if="advanceIcon">
        <slot name="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title :class="{ 'text-wrap': wrapTitle }">
          <div v-text="title" />
          <slot name="title" />
        </v-list-item-title>
        <v-list-item-subtitle :class="{ 'text-wrap': wrapSubtitle }">
          <div v-text="subtitle" />
          <slot name="subtitle" />
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <slot name="actions" />
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import Icon from "@/components/common/Icon";

export default {
  name: "CardInfo",
  components: { Icon },
  props: {
    icon: String,
    iconColor: String,
    title: String,
    subtitle: String,
    advanceIcon: Boolean,
    wrapTitle: Boolean,
    wrapSubtitle: Boolean,
    small: Boolean,
    xSmall: Boolean,
    large: Boolean,
    xLarge: Boolean,
    fullWidth: Boolean,
  },
};
</script>
