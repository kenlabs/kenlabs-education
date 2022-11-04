<template>
  <section id="explore_links">
    <v-row dense>
      <v-col cols="5">
        <div class="container">
          <div class="image">
            <v-img src="/images/alien-fungi.png" />
          </div>
          <div class="title">
            <div class="h3">Build the Metaverse with Filecoin</div>
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <div class="text-container">
          <div class="h4">Getting Started</div>
          <a class="link" href="#"><span class="text">Online Docs</span></a>
          <a class="link" href="#"><span class="text">Hackathons</span></a>
          <div class="h4">Support</div>
          <a class="link" href="#"><span class="text">Metaverse Team @ Filecoin</span></a>
          <a class="link" href="#"><span class="text">Filecoin Community</span></a>
          <div class="h4">Funding</div>
          <a class="link" href="#"><span class="text">Grants</span></a>
          <a class="link" href="#"><span class="text">Accelerators</span></a>
          <a class="link" href="#"><span class="text">Investments</span></a>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "ExploreLinks"
};
</script>

<style lang="scss" scoped>
#explore_links {
  position: relative;
  padding: 22rem 6rem 10rem;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/warped-spacetime.svg");
    background-repeat: no-repeat;
    background-position: top;
    background-size: 1660px;
    z-index: 0;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 8rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/smudge-group.svg");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 1366px;
    filter: blur(60px);
    z-index: 1;
    opacity: .65;
    transform: translateY(50%);
  }
}

.title {
  .h3 {
    margin-top: 2rem;
    font-size: 3.125rem;
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 0.75rem;
  padding: 1.1875rem 2.5rem;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  position: relative;
  border-radius: 1.875rem;
  box-sizing: border-box;
  z-index: 100;
  background: linear-gradient(-110deg, #fff, #fff 33%, #ffb26b 54.78%, #ffa959 66%, #ffa959);
  background-size: 300%;
  background-position: 100% 0;
  transition: .25s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-position: 50% 0;
  }

  &:before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: #16131a;
    border-radius: inherit;
  }

  .text {
    transition: inherit;
    display: block;
    white-space: nowrap;
    z-index: 15;
    position: relative;
    color: #fff;
  }
}
</style>
