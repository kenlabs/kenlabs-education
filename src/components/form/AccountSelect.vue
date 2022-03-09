<!-- 账户选择组件 -->
<template>
  <v-autocomplete
    :value="value"
    dense
    outlined
    :disabled="status.loading"
    :loading="status.loading"
    :label="label"
    :placeholder="placeholder"
    :multiple="multiple"
    :search-input="search"
    :items="items"
    hide-details
    item-text="nickname"
    return-object
    @change="$emit('change', $event)"
    @update:search-input="fetchAccounts"
  />
</template>

<script>
export default {
  name: "AccountSelect",
  props: {
    value: Object,
    label: {
      type: String,
      default: "选择账户",
    },
    placeholder: {
      type: String,
      default: "搜索账户基本信息",
    },
    multiple: Boolean,
  },
  data() {
    return {
      search: null,
      items: [],
      status: {
        loading: false,
      },
    };
  },
  methods: {
    fetchAccounts() {
      this.status.loading = true;
      this.$axios.get("/accounts", { params: { search: this.search } }).then((res) => {
        this.items = res.data.content;
        this.status.loading = false;
      });
    },
  },
};
</script>
