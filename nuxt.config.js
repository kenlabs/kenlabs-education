import config from "./src/configs";

const { locale, availableLocales, fallbackLocale } = config.locales;

const baseUrl = process.env.NODE_ENV === "production" ? config.axios.base.prod : config.axios.base.dev;

export default {
  ssr: false,
  target: "static",
  srcDir: "src/",
  head: config.head,
  server: config.server,
  css: ["~/assets/scss/theme.scss"],
  plugins: [
    { src: "~/plugins/animate.js", mode: "client" },
    { src: "~/plugins/axios.js", mode: "client" },
    { src: "~/plugins/clipboard.js", mode: "client" },
    { src: "~/plugins/vue-permission.js", mode: "client" },
    { src: "~/plugins/vue-shortkey.js", mode: "client" },
    { src: "~/filters/capitalize.js" },
    { src: "~/filters/formatCurrency.js" },
    { src: "~/filters/formatDate.js" },
    { src: "~/filters/fromNow.js" },
    { src: "~/filters/lowercase.js" },
    { src: "~/filters/uppercase.js" },
  ],
  buildModules: [
    [
      "@nuxtjs/vuetify",
      {
        customVariables: ["~/assets/scss/vuetify/variables/_index.scss"],
        optionsPath: "~/configs/vuetify.js",
        treeShake: true,
        defaultAssets: {
          font: false,
          icons: false,
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
  router: {
    middleware: ["auth"],
  },
  env: {
    BASE_URL: baseUrl,
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/toast"],
  auth: config.auth,
  toast: config.toast,
  axios: {
    baseURL: baseUrl,
  },
};
