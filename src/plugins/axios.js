export default function ({ app, $axios }) {
  $axios.onError((error) => {
    let message;
    if (error.response) {
      const response = error.response;
      if (response.status === 400) {
        if (response.data && response.data.error) {
          message = response.data.error;
        } else {
          message = "请求参数错误";
        }
      } else if (response.status === 401) {
        message = "请登录以后访问该资源";
      } else if (response.status === 403) {
        message = "没有权限访问该资源";
      } else if (response.status === 404) {
        message = "资源不存在或者已被删除";
      } else if (response.status === 500) {
        if (response.data && response.data.error) {
          message = response.data.error;
        } else {
          message = "网络错误";
        }
      } else {
        message = "未知错误";
      }
    } else if (error.message) {
      message = error.message;
    } else {
      message = error;
    }
    app.$toast.global.error(message);
  });
}
