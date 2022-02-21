<!-- 用户信息工具栏组件 -->
<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon class="elevation-2" v-on="on">
        <v-badge color="success" dot bordered offset-x="10" offset-y="10" :value="false">
          <v-avatar size="40">
            <v-img :src="avatar" />
          </v-avatar>
        </v-badge>
      </v-btn>
    </template>
    <!-- 下拉菜单 -->
    <v-list dense nav>
      <v-list-item v-for="(item, index) in menu" :key="index" :to="localePath(item.link)" :exact="item.exact" :disabled="item.disabled" link>
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.key ? $t(item.key) : item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon small>fa-arrow-right-from-bracket</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('menu.logout')" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from "../../configs";

export default {
  data() {
    return {
      menu: config.toolbar.user,
    };
  },
  computed: {
    avatar() {
      if (this.$auth.user) {
        return this.$auth.user.avatar;
      } else {
        return "/images/logo.png";
      }
    },
  },
  methods: {
    logout() {
      this.$auth.logout("local");
    },
  },
};
</script>
