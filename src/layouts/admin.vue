<template>
  <v-app>
    <div v-shortkey="['ctrl', '/']" class="d-flex flex-grow-1" @shortkey="onKeyup">
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

      <!-- Toolbar -->
      <v-app-bar app :color="isToolbarDetached ? 'surface' : undefined" :flat="isToolbarDetached" :light="toolbarTheme === 'light'" :dark="toolbarTheme === 'dark'">
        <v-card class="flex-grow-1 d-flex" :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!isToolbarDetached">
          <div class="d-flex flex-grow-1 align-center">
            <!-- search input mobile -->
            <v-text-field v-if="showSearch" append-icon="mdi-close" placeholder="Search" prepend-inner-icon="mdi-magnify" hide-details solo flat autofocus @click:append="showSearch = false"></v-text-field>

            <div v-else class="d-flex flex-grow-1 align-center">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

              <v-spacer class="d-none d-lg-block"></v-spacer>

              <!-- search input desktop -->
              <v-text-field ref="search" class="mx-1 hidden-xs-only" :placeholder="$t('menu.search')" prepend-inner-icon="mdi-magnify" hide-details filled rounded dense></v-text-field>

              <v-spacer class="d-block d-sm-none"></v-spacer>

              <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <toolbar-language />

              <div class="hidden-xs-only mx-1">
                <toolbar-currency />
              </div>

              <toolbar-apps />

              <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
                <toolbar-notifications />
              </div>

              <toolbar-user />
            </div>
          </div>
        </v-card>
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" :fluid="!isContentBoxed">
          <v-layout>
            <nuxt />
          </v-layout>
        </v-container>

        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            Built with
            <v-icon small color="pink">mdi-heart</v-icon>
            <a class="text-decoration-none" href="https://indielayer.com" target="_blank">@indielayer</a>
          </div>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MainMenu from "@/components/navigation/MainMenu";

export default {
  components: { MainMenu },
  data() {
    return {
      drawer: null,
      showSearch: false,
      menu: {},
      status: { loading: false },
    };
  },
  computed: {
    ...mapState("system", ["product", "navigation", "isContentBoxed", "menuTheme", "toolbarTheme", "isToolbarDetached"]),
  },
  mounted() {
    this.fetchMenu();
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus();
    },
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
