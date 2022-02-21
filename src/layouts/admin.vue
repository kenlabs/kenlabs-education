<template>
  <v-app>
    <div class="d-flex flex-grow-1">
      <!-- 侧边导航栏 -->
      <v-navigation-drawer v-model="drawer" app floating class="elevation-1" :right="$vuetify.rtl" :light="menuTheme === 'light'" :dark="menuTheme === 'dark'">
        <template v-slot:prepend>
          <v-list>
            <v-list-item to="/">
              <v-list-item-avatar>
                <v-img :src="product.logo"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="primary--text" v-text="product.name" />
                <v-list-item-subtitle class="grey--text" v-text="product.desc" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>

        <v-skeleton-loader :loading="status.loading" type="list-item@7">
          <main-menu :menu="menu.children" />
        </v-skeleton-loader>
      </v-navigation-drawer>

      <!-- 顶部工具栏 -->
      <v-app-bar
        app
        :color="theme.isToolbarDetached ? 'surface' : undefined"
        :flat="theme.isToolbarDetached"
        :light="theme.toolbarTheme === 'light'"
        :dark="theme.toolbarTheme === 'dark'"
      >
        <v-card class="flex-grow-1 d-flex" :class="[theme.isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!theme.isToolbarDetached">
          <div class="d-flex flex-grow-1 align-center">
            <div class="d-flex flex-grow-1 align-center">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <v-spacer />
              <toolbar-user />
            </div>
          </div>
        </v-card>
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" :fluid="!theme.isContentBoxed">
          <v-layout>
            <nuxt />
          </v-layout>
        </v-container>

        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            <v-icon small>fa-copyright</v-icon>
            <a class="text-decoration-none" target="_blank" :href="product.links.www" v-text="product.name" />
          </div>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MainMenu from "@/components/navigation/MainMenu";
import ToolbarUser from "@/components/toolbar/ToolbarUser";

export default {
  components: { MainMenu, ToolbarUser },
  data() {
    return {
      drawer: null,
      menu: {},
      status: { loading: false },
    };
  },
  computed: {
    ...mapState("system", ["product", "navigation", "theme", "isContentBoxed", "menuTheme", "toolbarTheme", "isToolbarDetached"]),
  },
  mounted() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu() {
      this.status.loading = true;
      this.$axios.get(`/menu/${this.navigation.admin}`).then((res) => {
        this.menu = res.data;
        this.status.loading = false;
      });
    },
  },
};
</script>
