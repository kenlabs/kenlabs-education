<!-- 国旗图标 -->
<template>
  <span class="fi" :class="`fi-${flag}`" />
</template>

<script>
import "flag-icons/css/flag-icons.min.css";

export default {
  props: {
    flag: {
      type: String,
      default: "cn",
    },
  },
};
</script>
