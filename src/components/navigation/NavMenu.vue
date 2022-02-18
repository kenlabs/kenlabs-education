<template>
  <div>
    <!-- 一级菜单 -->
    <nav-menu-item v-for="(level1Item, level1Index) in menu" v-if="level1Item.visible" :key="level1Index" :menu-item="level1Item">
      <template v-if="level1Item.children">
        <!-- 二级菜单 -->
        <nav-menu-item v-for="(level2Item, level2Index) in level1Item.children" v-if="level2Item.visible" :key="level2Index" :menu-item="level2Item" subgroup small>
          <template v-if="level2Item.children">
            <!-- 三级菜单 -->
            <nav-menu-item v-for="(level3Item, level3Index) in level2Item.children" v-if="level3Item.visible" :key="level3Index" :menu-item="level3Item" small />
          </template>
        </nav-menu-item>
      </template>
    </nav-menu-item>
  </div>
</template>

<script>
import NavMenuItem from "./NavMenuItem";

export default {
  components: {
    NavMenuItem,
  },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
