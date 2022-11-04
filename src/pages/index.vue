<!-- 首页 -->
<template>
  <v-flex grow>
    <site-header />
    <div class="sections">
      <hero-header />
      <intro1 />
      <intro2 />
      <slider-header />
    </div>
  </v-flex>
</template>

<script>
import SiteHeader from "~/components/app/SiteHeader";
import HeroHeader from "~/components/app/HeroHeader";
import Intro1 from "~/components/app/Intro1";
import Intro2 from "~/components/app/Intro2";
import SliderHeader from "~/components/app/SliderHeader";

export default {
  components: { SliderHeader, Intro2, Intro1, HeroHeader, SiteHeader },
  layout: "simple",
  auth: false
};
</script>
