<!-- 用户信息卡片 -->
<template>
  <v-card :min-width="width" :max-width="width">
    <v-card-text>
      <div class="d-flex flex-column align-center">
        <v-img :max-width="avatarWidth" :max-height="avatarWidth" class="rounded-lg my-4" :src="account.avatar" />
        <div class="text-h6" v-text="account.nickname" />
      </div>
    </v-card-text>
    <v-card-text>
      <v-list dense>
        <v-list-item v-if="account.email">
          <v-list-item-icon>
            <v-icon small>fa-envelope</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle v-text="account.email" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="account.mobile">
          <v-list-item-icon>
            <v-icon small>fa-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle v-text="account.mobile" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserInfoCard",
  props: {
    account: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 360,
    },
    avatarWidth: {
      type: Number,
      default: 120,
    },
  },
};
</script>
