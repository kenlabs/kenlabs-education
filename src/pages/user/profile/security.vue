<!-- 账户安全页面 -->
<template>
  <div class="flex-grow-1">
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-key</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>账户密码</v-list-item-title>
          <v-list-item-subtitle>当前密码强度：一般</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn text color="primary" @click.stop="password.dialog = true">修改密码</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <form-dialog
      v-model="password.dialog"
      icon="fa-key"
      title="修改账户密码"
      subtitle="修改账户的登录密码，修改成功后，下次登录系统需要使用新的密码"
      @submit="changePassword"
    >
      <v-row dense>
        <v-col cols="12">
          <text-field v-model="password.form.oldPassword" label="原始密码" type="password" />
        </v-col>
        <v-col cols="12">
          <text-field v-model="password.form.newPassword" label="新密码" type="password" />
        </v-col>
        <v-col cols="12">
          <text-field v-model="password.form.confirmPassword" label="确认密码" type="password" />
        </v-col>
      </v-row>
    </form-dialog>
  </div>
</template>

<script>
import FormDialog from "@/components/form/FormDialog";
import TextField from "@/components/form/TextField";

export default {
  components: { TextField, FormDialog },
  layout: "admin",
  head() {
    return {
      title: "账户安全",
    };
  },
  data() {
    return {
      password: {
        dialog: false,
        form: {},
      },
    };
  },
  methods: {
    changePassword(status, form) {
      this.$axios
        .put("/accounts/password", this.password.form)
        .then(() => {
          this.$toast.global.success("账户密码修改成功");
          this.password.dialog = false;
          form.reset();
        })
        .finally(() => {
          status.submitting = false;
        });
    },
  },
};
</script>
