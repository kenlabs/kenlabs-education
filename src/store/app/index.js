import configs from "../../configs";
import mutations from "./mutations";

const { product, time, theme, currencies } = configs;

const { globalTheme, menuTheme, toolbarTheme, isToolbarDetached, isContentBoxed, isRTL } = theme;
const { currency, availableCurrencies } = currencies;

// state initial values
const state = () => ({
  time,

  // currency
  currency,
  availableCurrencies,

  // themes and layout configurations
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
