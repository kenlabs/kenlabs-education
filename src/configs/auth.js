/**
 * 认证相关配置
 * https://auth.nuxtjs.org/
 */
export default {
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
};
