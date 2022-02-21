<!-- 个人中心页面 -->
<template>
  <div class="flex-grow-1 d-flex">
    <div>
      <user-info-card :account="$auth.user" />
    </div>
    <div class="ml-2 flex-grow-1">
      <user-info-form />
    </div>
  </div>
</template>

<script>
import UserInfoCard from "@/components/user/UserInfoCard";
import FormCard from "@/components/form/FormCard";
import UserInfoForm from "@/components/user/UserInfoForm";

export default {
  components: { UserInfoForm, FormCard, UserInfoCard },
  layout: "admin",
  head() {
    return {
      title: "个人资料",
    };
  },
};
</script>
