<template>
  <div class="image-card" :class="tall ? 'tall' : ''">
    <div class="label" v-text="label" />
    <div class="title-text" v-text="title" />
    <div class="desc-text" v-text="desc" />
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    label: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    tall: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.image-card {
  position: relative;
  padding: 1.875rem 1.875rem 1.25rem;
  border: 1px solid #fff;
  border-radius: 1.875rem;
  margin: 0 0.5rem 1rem;
  display: block;
  width: 100%;

  .label {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 1.75rem;
  }

  .title-text {
    font-family: "Space Grotesk";
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
    background: linear-gradient(100deg, #ff6d44, #ffb26b 33%, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .desc-text {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.8;
    margin-top: 0.75rem;
  }
}
</style>
