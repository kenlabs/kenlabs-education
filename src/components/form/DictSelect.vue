<!-- 字典选择组件 -->
<template>
  <v-autocomplete
    dense
    outlined
    hide-details
    :loading="status.loading"
    :disabled="status.loading"
    :value="value"
    :multiple="multiple"
    :label="label"
    :items="items"
    item-text="name"
    item-value="code"
    @change="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: "DictSelect",
  props: {
    dict: {
      type: String,
      required: true,
    },
    value: {
      type: String || Array,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "选择字典",
    },
  },
  data() {
    return {
      items: [],
      status: {
        loading: false,
      },
    };
  },
  mounted() {
    this.fetchDictItems();
  },
  methods: {
    fetchDictItems() {
      this.status.loading = true;
      this.$axios
        .get(`/property/dict/${this.dict}`)
        .then((res) => res.data)
        .then((dict) => {
          this.items = dict.items;
          this.status.loading = false;
        });
    },
  },
};
</script>
