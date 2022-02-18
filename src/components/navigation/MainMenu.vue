<template>
  <!-- 系统侧边栏导航组件 -->
  <v-list nav dense>
    <div v-for="(item, index) in menu" v-if="item.visible" :key="index">
      <div v-if="item.key || item.text" class="pa-1 mt-2 overline">
        {{ item.key ? $t(item.key) : item.text }}
      </div>
      <nav-menu :menu="item.children" />
    </div>
  </v-list>
</template>

<script>
import NavMenu from "./NavMenu";

export default {
  components: {
    NavMenu,
  },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
