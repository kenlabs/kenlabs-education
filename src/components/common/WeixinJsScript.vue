<!-- 微信公众号JS脚本功能封装 -->
<template>
  <div class="weixin-js-script" style="display: none" />
</template>

<script>
import wx from "weixin-js-sdk";

export default {
  name: "WeixinJsScript",
  props: {
    appId: String,
    shareData: Boolean, // 是否开启分享接口
    image: Boolean, // 是否开启图片接口
    location: Boolean, // 是否开启地理位置接口
    pay: Boolean, // 是否开启微信支付接口
  },
  data() {
    return {
      ready: false,
    };
  },
  mounted() {
    this.initConfig();
  },
  methods: {
    initConfig() {
      this.$axios
        .get("/weixin/mp/jsapi", {
          params: {
            appId: this.appId,
            url: window.location.href,
          },
        })
        .then((res) => res.data)
        .then((config) => {
          wx.config({
            debug: config.debug,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: this.getJsApiList(),
          });
          wx.ready(() => {
            this.ready = true;
            this.$emit("ready", wx);
          });
        });
    },
    getJsApiList() {
      const apiList = [];
      if (this.shareData) {
        apiList.push("updateAppMessageShareData");
        apiList.push("updateTimelineShareData");
      }
      if (this.image) {
        apiList.push("chooseImage");
        apiList.push("previewImage");
        apiList.push("uploadImage");
        apiList.push("downloadImage");
      }
      if (this.location) {
        apiList.push("openLocation");
        apiList.push("getLocation");
      }
      if (this.pay) {
        apiList.push("chooseWXPay");
      }
      return apiList;
    },
    /**
     * 设置微信分享数据
     * @param title 分享标题
     * @param desc 分享描述
     * @param link 分享链接
     * @param image 分享封面
     */
    updateShareData(title, desc, image, link) {
      if (this.ready) {
        wx.updateAppMessageShareData({
          title: title,
          desc: desc,
          link: link ? link : window.location.href,
          imgUrl: image,
        });
        wx.updateTimelineShareData({
          title: title,
          link: link ? link : window.location.href,
          imgUrl: image,
        });
      }
    },
    /**
     * 预览图片
     * @param current 当前显示图片
     * @param urls 需要预览的图片
     */
    previewImage(current, urls) {
      if (this.ready) {
        wx.previewImage({
          current: current,
          urls: urls,
        });
      }
    },
    /**
     * 发起微信支付
     * @param order 系统订单
     */
    chooseWXPay(order) {
      if (order.amountTotal > 0) {
        this.$axios
          .post("/weixin/pay/order/create/jsapi", { orderId: order.id })
          .then((res) => res.data)
          .then((payload) => {
            wx.chooseWXPay({
              timestamp: payload.timeStamp,
              nonceStr: payload.nonceStr,
              package: payload.packageValue,
              signType: payload.signType,
              paySign: payload.paySign,
              success: () => {
                this.queryOrderStatus(order.id);
              },
              cancel: () => {
                this.$emit("payCancel", order);
              },
            });
          });
      } else {
        this.finishOrder(order);
      }
    },
    queryOrderStatus(orderId) {
      this.$axios
        .get(`/weixin/pay/order/query?orderId=${orderId}`)
        .then((res) => res.data)
        .then((order) => {
          if (order.tradeState === "SUCCESS") {
            this.finishOrder(order);
          } else {
            setTimeout(() => {
              this.queryOrderStatus(orderId);
            }, 2000);
          }
        });
    },
    finishOrder(order) {
      this.$emit("paySuccess", order);
    },
  },
};
</script>
