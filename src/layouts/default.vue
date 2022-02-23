<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-layout>
          <nuxt />
        </v-layout>
      </v-container>
    </v-main>
    <v-bottom-navigation grow fixed>
      <v-btn to="/">
        <div class="mt-1">首页</div>
        <icon small icon="home" />
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Icon from "@/components/common/Icon";

export default {
  components: { Icon },
};
</script>

<style scoped>
main {
  margin-bottom: 56px;
}
</style>
