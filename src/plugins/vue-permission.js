import Vue from "vue";

/**
 * 检查账户是否有权限，如果没有权限则会隐藏该组件
 *
 * 1. 如果未登录，则拒绝，否则
 * 2. 如果是管理员，则放行，否则
 * 3. 根据账户是否有权限决定是否放行
 */
Vue.directive("permission", function (el, binding, vnode) {
  const account = vnode.context.$auth.user;
  if (!account) {
    removeNode(el);
  } else {
    if (!account.admin) {
      /* 如果已登录，但不是管理员，则检查是否拥有该权限 */
      const checkPermission = binding.rawName.substr(binding.rawName.indexOf(":") + 1);
      if (!account.authorities.includes(checkPermission)) {
        removeNode(el);
      }
    }
  }
});

function removeNode(el) {
  if (el.parentElement) {
    el.parentElement.removeChild(el);
  }
}
