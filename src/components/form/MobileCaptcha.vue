<!-- 手机验证码组件 -->
<template>
  <div class="d-flex align-center">
    <text-field :value="value" label="短信验证码" placeholder="输入收到的验证码" @input="$emit('input', $event)" />
    <v-btn text :disabled="status.sending || status.counting" :loading="status.sending" class="ml-1" color="info" @click="send" v-text="text" />
  </div>
</template>

<script>
import TextField from "~/components/form/TextField";

export default {
  name: "MobileCaptcha",
  components: { TextField },
  props: {
    value: String,
    mobile: String,
    counter: {
      type: Number,
      default: 60,
    },
    api: {
      type: String,
      default: "/common/captcha/mobile",
    },
  },
  data() {
    return {
      status: {
        sending: false,
        counting: false,
        success: false,
        counter: this.counter,
      },
      timer: null,
      text: "发送验证码",
    };
  },
  computed: {
    isValid() {
      return /(0|86|\+86)?1[3-9]\d{9}$/.test(this.mobile);
    },
  },
  methods: {
    send() {
      const vm = this;
      if (this.isValid) {
        this.status.sending = true;
        this.$axios.post(this.api, this.mobile, { headers: { "Content-Type": "application/json" } }).then(() => {
          this.status.counter = this.counter;
          this.status.counting = true;
          this.status.success = true;
          this.timer = setInterval(function () {
            vm.status.counter--;
            vm.text = `${vm.status.counter} 秒后重发`;
            if (vm.status.counter === 0) {
              clearInterval(vm.timer);
              vm.status.counting = false;
              vm.text = "发送验证码";
            }
          }, 1000);
          this.status.sending = false;
        });
      }
    },
  },
};
</script>
