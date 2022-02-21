<!-- 个人资料表单 -->
<template>
  <form-card icon="fa-user-pen" title="个人资料" subtitle="修改个人账户的基本资料" :disabled="status.loading" @submit="submit">
    <v-row dense>
      <v-col cols="3">
        <text-field v-model="account.nickname" label="昵称" />
      </v-col>
      <v-col cols="2">
        <text-field v-model="account.name" label="姓名" />
      </v-col>
      <v-col cols="2">
        <dict-select v-model="account.sex" dict="sex" label="性别" />
      </v-col>
      <v-col cols="2">
        <dict-select v-model="account.nation" dict="nation" label="民族" />
      </v-col>
      <v-col cols="3">
        <date-picker v-model="account.birthday" label="生日" />
      </v-col>
      <v-col cols="3">
        <text-field v-model="account.identity" label="身份证号" />
      </v-col>
      <v-col cols="2">
        <dict-select v-model="account.language" dict="language" label="语言" />
      </v-col>
      <v-col cols="1">
        <text-field v-model="account.country" label="国家" />
      </v-col>
      <v-col cols="1">
        <text-field v-model="account.province" label="省份" />
      </v-col>
      <v-col cols="1">
        <text-field v-model="account.city" label="城市" />
      </v-col>
      <v-col cols="4">
        <text-field v-model="account.remark" label="备注" />
      </v-col>
    </v-row>
  </form-card>
</template>

<script>
import FormCard from "@/components/form/FormCard";
import TextField from "@/components/form/TextField";
import DictSelect from "@/components/form/DictSelect";
import DatePicker from "@/components/form/DatePicker";

export default {
  name: "UserInfoForm",
  components: { DatePicker, DictSelect, TextField, FormCard },
  data() {
    return {
      account: {},
      status: { loading: false },
    };
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    fetchAccount() {
      this.status.loading = true;
      this.$axios.get("/accounts/current").then((res) => {
        this.account = res.data;
        this.status.loading = false;
      });
    },
    submit(status) {
      this.$axios
        .put("/accounts/info", this.account)
        .then(() => {
          this.fetchAccount();
          this.$toast.global.success("更新个人资料成功");
        })
        .finally(() => {
          status.submitting = false;
        });
    },
  },
};
</script>
