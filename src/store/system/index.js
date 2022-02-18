import configs from "../../configs";
import mutations from "./mutations";

const { product, time, theme, navigation } = configs;

const { globalTheme, menuTheme, toolbarTheme, isToolbarDetached, isContentBoxed, isRTL } = theme;

const state = () => ({
  time,
  currency: configs.currencies,
  theme,
  globalTheme,
  menuTheme,
  toolbarTheme,
  isToolbarDetached,
  isContentBoxed,
  isRTL,
  product,
  navigation,
});

export default {
  namespaced: true,
  state,
  mutations,
};
