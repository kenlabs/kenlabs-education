import config from "./src/configs";

const { head } = config.head;
const { locale, availableLocales, fallbackLocale } = config.locales;

export default {
  ssr: false,
  target: "static",
  srcDir: "src/",
  components: true,
  head,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/scss/theme.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // plugins
    { src: "~/plugins/animate.js", mode: "client" },
    { src: "~/plugins/clipboard.js", mode: "client" },
    { src: "~/plugins/vue-shortkey.js", mode: "client" },

    // filters
    { src: "~/filters/capitalize.js" },
    { src: "~/filters/lowercase.js" },
    { src: "~/filters/uppercase.js" },
    { src: "~/filters/formatCurrency.js" },
    { src: "~/filters/formatDate.js" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    [
      "@nuxtjs/vuetify",
      {
        customVariables: ["~/assets/scss/vuetify/variables/_index.scss"],
        optionsPath: "~/configs/vuetify.js",
        treeShake: true,
        defaultAssets: {
          font: false,
        },
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
        },
        locales: availableLocales,
        lazy: true,
        langDir: "translations/",
        defaultLocale: locale,
        vueI18n: {
          fallbackLocale,
        },
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/toast"],

  auth: {
    strategies: {
      local: {
        token: {
          property: "accessToken",
          maxAge: 86400,
        },
        endpoints: {
          login: {
            url: "/login/username",
            method: "post",
          },
          logout: {
            url: "/login/logout",
            method: "post",
          },
          user: {
            url: "/accounts/current",
            method: "get",
          },
        },
        user: {
          property: "",
        },
      },
    },
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      home: "/",
    },
    cookie: false,
  },

  toast: {
    register: [
      {
        name: "info",
        message: (payload) => payload,
        options: {
          type: "info",
          duration: 2000,
          keepOnHover: true,
          theme: "outline",
          iconPack: "fontawesome",
          icon: "info-circle",
        },
      },
      {
        name: "success",
        message: (payload) => payload,
        options: {
          type: "success",
          duration: 2000,
          keepOnHover: true,
          theme: "outline",
          iconPack: "fontawesome",
          icon: "check",
        },
      },
      {
        name: "error",
        message: (payload) => payload,
        options: {
          type: "error",
          duration: 2000,
          keepOnHover: true,
          theme: "outline",
          iconPack: "fontawesome",
          icon: "exclamation-triangle",
        },
      },
    ],
  },
};
