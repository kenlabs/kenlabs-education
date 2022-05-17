<template>
  <div>
    <div class="d-flex flex-column align-center pa-2">
      <v-img src="/images/logo.png" max-width="96" />
    </div>
    <div class="text-subtitle-1 mb-8" v-text="product.slogan" />
    <template v-if="hasCode">
      <div class="text-subtitle-2 grey--text mb-4">授权成功，请等待页面自动跳转</div>
      <div>
        <icon class="mb-9" x-large color="green" icon="circle-check" />
      </div>
    </template>
    <template v-else>
      <div class="text-subtitle-2 grey--text mb-4">请授权微信自动登录</div>
      <v-progress-circular :size="50" class="mb-8" color="primary" indeterminate />
    </template>
  </div>
</template>
<script>
import product from "@/configs/product";
import Icon from "@/components/common/Icon";

export default {
  components: { Icon },
  layout: "auth",
  async asyncData({ query }) {
    const code = query.code;
    const state = query.state;
    return { code, state };
  },
  data() {
    return {
      product: product,
    };
  },
  computed: {
    hasCode() {
      return !!this.code;
    },
  },
  mounted() {
    if (this.code) {
      this.doAuth();
    } else {
      this.doAuthRedirect();
    }
  },
  methods: {
    doAuth() {
      const fromPath = this.state;
      this.$auth.loginWith("weixin", { data: { code: this.code } }).then(() => {
        this.$router.push(fromPath);
      });
    },
    doAuthRedirect() {
      const fromPath = this.$nuxt.context.from.path;
      this.$axios
        .get("/weixin/mp/auth", {
          params: {
            state: fromPath,
            href: window.location.href,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          window.location.href = res;
        });
    },
  },
};
</script>
