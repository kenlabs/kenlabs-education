import config from "./src/configs";

const { locale, availableLocales, fallbackLocale } = config.locales;

export default {
  ssr: false,
  target: "static",
  srcDir: "src/",
  head: config.head,
  css: ["~/assets/scss/theme.scss"],
  plugins: [
    { src: "~/plugins/animate.js", mode: "client" },
    { src: "~/plugins/clipboard.js", mode: "client" },
    { src: "~/plugins/vue-shortkey.js", mode: "client" },
    { src: "~/filters/capitalize.js" },
    { src: "~/filters/formatCurrency.js" },
    { src: "~/filters/formatDate.js" },
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
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/toast"],
  auth: config.auth,
  toast: config.toast,
};
