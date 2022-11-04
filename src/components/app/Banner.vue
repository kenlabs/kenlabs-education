<template>
  <section id="banner">
    <div class="text">
      <div class="h2">
        <div>We are building a global</div>
        <div class="text-right">infrastructure today, to power the Metaverse of tomorrow</div>
      </div>
      <div class="description">The Filecoin protocol's incentive model sustains a global infrastructure of storage
        providers to support the storage demands of the Metaverse.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner"
};
</script>

<style lang="scss" scoped>

#banner {
  position: relative;
  display: block;
  padding: 19rem 6rem 30rem;

  &:before {
    background-size: 1440px;
    content: "";
    position: absolute;
    height: 100%;
    background-repeat: no-repeat;
    top: -16rem;
    left: -2rem;
    width: calc(100% + 2rem);
    background-image: url("/images/moon-and-satellite-planet.png");
    background-position: top;
    opacity: .25;
  }

  &:after {
    background-size: 1440px;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: url("/images/background-field-a.svg");
    background-repeat: no-repeat;
    background-position: bottom;
  }
}

.description {
  text-align: right;
  width: 75%;
  margin-left: auto;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1.75rem;
  font-weight: 400;
}
</style>
