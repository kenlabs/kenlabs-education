<!-- 管理端货币单位选择菜单 -->
<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">{{ `${currency.current.currencySymbol} ${currency.current.label}` }}</v-btn>
    </template>
    <v-list dense nav>
      <v-list-item v-for="item in currency.availableCurrencies" :key="item.label" @click="setCurrency(item)">
        <v-list-item-title>{{ `${item.currencySymbol} ${item.label}` }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState("system", ["currency"]),
  },
  methods: {
    ...mapMutations("system", ["setCurrency"]),
  },
};
</script>
