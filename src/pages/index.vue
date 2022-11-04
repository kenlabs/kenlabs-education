<!-- 首页 -->
<template>
  <v-flex grow>
    <site-header />
    <div class="sections">
      <hero-header />
      <intro1 />
      <intro2 />
      <slider-header />
      <gallery1 />
      <banner />
      <gallery2 />
    </div>
  </v-flex>
</template>

<script>
import SiteHeader from "~/components/app/SiteHeader";
import HeroHeader from "~/components/app/HeroHeader";
import Intro1 from "~/components/app/Intro1";
import Intro2 from "~/components/app/Intro2";
import SliderHeader from "~/components/app/SliderHeader";
import Gallery1 from "~/components/app/Gallery1";
import Banner from "~/components/app/Banner";
import Gallery2 from "~/components/app/Gallery2";

export default {
  components: { Gallery2, Banner, Gallery1, SliderHeader, Intro2, Intro1, HeroHeader, SiteHeader },
  layout: "simple",
  auth: false
};
</script>
