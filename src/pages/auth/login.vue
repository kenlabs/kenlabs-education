<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2" v-text="$t('auth.login.title')" />
      <v-card-subtitle v-text="$t('auth.login.desc')" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="login.username"
            name="username"
            :rules="[(it) => !!it || '请输入用户名']"
            :validate-on-blur="false"
            :error="status.error"
            :label="$t('auth.login.username')"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          />

          <v-text-field
            v-model="login.password"
            :append-icon="status.password ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[(it) => !!it || '请输入登录密码']"
            :type="status.password ? 'text' : 'password'"
            :error="status.error"
            :label="$t('auth.login.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="status.password = !status.password"
          />

          <v-btn :loading="status.logging" :disabled="status.logging" block x-large color="primary" @click="submit" v-text="$t('auth.login.button')" />
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "auth",
  auth: false,
  head() {
    return {
      title: this.$t("auth.login.title"),
    };
  },
  data() {
    return {
      status: {
        logging: false,
        password: false,
        error: false,
        message: null,
      },
      login: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState("system", ["product"]),
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.status.logging = true;
        this.signIn();
      }
    },
    signIn() {
      this.$auth
        .loginWith("local", { data: this.login })
        .then((res) => res.data)
        .then(() => {
          this.$router.push("/");
        })
        .finally(() => {
          this.status.logging = false;
        });
    },
    resetErrors() {
      this.status.error = false;
      this.status.message = "";
    },
  },
};
</script>
