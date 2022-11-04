<template>
  <section class="hero_header">
    <div class="image-container">
      <div class="image">
        <img src="/images/eclipse-with-lens-flare.png" />
      </div>
    </div>
    <div class="content px-6">
      <div class="heading mb-2">
        <div class="h1">Essential infrastructure</div>
        <div class="text-right h1">to power the Metaverse</div>
      </div>
      <div class="description">
        The Filecoin stack is open and resilient, built to store assets for multiple generations
      </div>
      <div class="d-flex mb-2">
        <v-spacer />
        <v-btn dark color="black" to="/#intro_1">Start Exploring</v-btn>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroHeader"
};
</script>

<style lang="scss" scoped>
.hero_header {
  position: relative;
  display: block;
  padding-top: 8.375rem;
  padding-bottom: 30rem;
}

.hero_header:before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  top: -7rem;
  background-repeat: no-repeat;
  background-image: url("/images/smudge-group.svg");
  background-position: top;
  filter: blur(60px);
  opacity: .6;
  z-index: 1;
}

.hero_header:after {
  content: "";
  position: absolute;
  top: 0;
  background-size: 1440px;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  background-image: url("/images/hero-header-background-field.svg");
}

.image-container {
  display: flex;
  flex: none;
  box-sizing: border-box;
}

.image {
  position: absolute;
  display: block;
  top: -1rem;
  left: calc(50% - 43.625rem);
  width: 100%;
  user-select: none;
}

.description {
  text-align: right;
  width: 50%;
  margin-left: auto;
  margin-bottom: 1.75rem;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
}


img {
  margin: 4.75rem 0;
}
</style>
