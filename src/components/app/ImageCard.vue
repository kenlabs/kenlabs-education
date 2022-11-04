<template>
  <div class="image-card" :class="tall ? 'tall' : ''">
    <div class="label" v-text="label" />
    <img v-if="image" :src="image" class="image" />
    <div class="title-text" v-text="title" />
  </div>
</template>

<script>
export default {
  name: "ImageCard",
  props: {
    label: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    title: {
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
    margin-right: 1.75rem;
  }

  .image {
    height: 12rem;
    margin: 1rem auto 0.5rem;
    transform: scale(.9);
    width: 100%;
    display: block;
  }

  .title-text {
    font-family: "Space Grotesk";
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
  }
}

.image-card.tall {
  .image {
    height: auto;
  }
}
</style>
