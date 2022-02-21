<!-- 统计信息展示组件 -->
<template>
  <div class="d-flex flex-column align-center">
    <div :class="[colorClass, sizeClass]">
      <count-to :end-val="value" :duration="2000" />
    </div>
    <b v-text="label" />
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "Statistic",
  components: { countTo },
  props: {
    label: String,
    value: Number,
    size: Number,
    color: String,
  },
  computed: {
    colorClass() {
      return this.color ? `${this.color}--text` : "";
    },
    sizeClass() {
      return `text-h${this.size || 4}`;
    },
  },
};
</script>
