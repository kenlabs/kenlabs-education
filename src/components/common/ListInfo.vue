<!-- 列表信息展示组件，用于展示字段细节 -->
<template>
  <v-list dense>
    <slot />
  </v-list>
</template>

<script>
export default {
  name: "ListInfo",
};
</script>
