/**
 * Toast 全局配置
 * https://www.npmjs.com/package/@nuxtjs/toast
 */
const option = {
  duration: 2000,
  keepOnHover: true,
  theme: "bubble",
  iconPack: "fontawesome",
};
export default {
  register: [
    {
      name: "info",
      message: (payload) => payload,
      options: {
        type: "info",
        icon: "circle-info",
        ...option,
      },
    },
    {
      name: "success",
      message: (payload) => payload,
      options: {
        type: "success",
        icon: "circle-check",
        ...option,
      },
    },
    {
      name: "error",
      message: (payload) => payload,
      options: {
        type: "error",
        icon: "triangle-exclamation",
        ...option,
      },
    },
  ],
};
