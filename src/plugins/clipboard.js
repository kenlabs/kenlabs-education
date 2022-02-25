import Vue from "vue";

/**
 * 复制粘贴工具
 * @param text 要复制的文本
 */
Vue.prototype.$clipboard = function (text) {
  return window.navigator.clipboard.writeText(text);
};
