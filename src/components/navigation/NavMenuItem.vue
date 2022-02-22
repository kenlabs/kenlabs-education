<template>
  <!-- 菜单项组件 -->
  <div>
    <!-- 渲染没有子菜单的情况 -->
    <v-list-item
      v-if="!menuItem.children.length"
      :input-value="menuItem.value"
      :to="localePath(menuItem.link)"
      :exact="menuItem.exact"
      :disabled="menuItem.disabled"
      active-class="primary--text"
      link
    >
      <v-list-item-icon>
        <icon small :icon="menuItem.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ menuItem.key ? $t(menuItem.key) : menuItem.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- 如果有子菜单，则渲染子菜单列表 -->
    <v-list-group
      v-else
      :value="menuItem.regex ? menuItem.regex.test($route.path) : false"
      :disabled="menuItem.disabled"
      :sub-group="subgroup"
      :to="localePath(menuItem.link)"
      link
    >
      <template v-slot:activator>
        <v-list-item-icon v-if="!subgroup">
          <icon small :icon="menuItem.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ menuItem.key ? $t(menuItem.key) : menuItem.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <slot></slot>
    </v-list-group>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Navigation Menu Item Component
|---------------------------------------------------------------------
|
| Navigation items for the NavMenu component
|
*/
import Icon from "@/components/common/Icon";

export default {
  components: { Icon },
  props: {
    menuItem: {
      type: Object,
      default: () => {},
    },
    subgroup: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
