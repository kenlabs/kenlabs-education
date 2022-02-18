import configs from "../../configs";
import mutations from "./mutations";

const { product, time, theme } = configs;

const { globalTheme, menuTheme, toolbarTheme, isToolbarDetached, isContentBoxed, isRTL } = theme;

const state = () => ({
  time,
  currency: configs.currencies,
  globalTheme,
  menuTheme,
  toolbarTheme,
  isToolbarDetached,
  isContentBoxed,
  isRTL,
  product,
});

export default {
  namespaced: true,
  state,
  mutations,
};
