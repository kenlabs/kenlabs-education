<!-- 账户登出页面 -->
<script>
export default {
  auth: false,
  mounted() {
    this.$auth.logout();
  },
};
</script>
