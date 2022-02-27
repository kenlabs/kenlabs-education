export default function ({ app, $axios }, inject) {
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
  inject("download", (url) => {
    $axios.get(url, { responseType: "blob" }).then((res) => {
      const filename = decodeURI(res.headers["content-disposition"].match(/filename=(.*)/)[1]);
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const url = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = url;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      }
    });
  });
}
