<template>
  <section id="gallery_3" class="px-10">
    <v-row dense>
      <v-col cols="4">
        <info-card title="How we think about the Metaverse"
                   desc="The Metaverse is all the rage these days. Everyone seems to be talking about it. Nearly every day now, an established brand announces a collaboration, or a virtual land makes headlines after being sold for astronomical sums." />
      </v-col>
      <v-col cols="8">
        <div class="text">
          <div class="ml-8 h2">Resources for the Builders of the Metaverse</div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="card-container">
          <info-card title="The Role of Identity in Connecting the Metaverse"
                     desc="In the physical and digital world today, our Identity is the currency underlying social and economic interactions..." />
          <info-card title="Building the Open Metaverse with Juan Benet"
                     desc="Juan Benet breaks down different kinds of applications and tools that will help you shape the worlds and experiences you want to create for your community." />
          <info-card title="A Community-driven Metaverse Landscape Framework"
                     desc="A tool which gives an overview of the current state of the metaverse landscape, featuring relevant projects and ..." />
        </div>
      </v-col>
      <v-col cols="8">
        <img class="px-6 image" src="/images/wormhole.svg" />
      </v-col>
      <v-col cols="4">
        <info-card title="Building the Metaverse with IPFS at BuildQuest Summit 2022"
                   desc="Some weeks ago, we had the opportunity to speak at BuildQuest Summit on Gaming and Metaverse..." />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import ImageCard from "~/components/app/ImageCard";
import InfoCard from "~/components/app/InfoCard";

export default {
  name: "Gallery3",
  components: { InfoCard, ImageCard }
};
</script>

<style lang="scss" scoped>
#gallery_3 {
  position: relative;
  padding-bottom: 8rem;
  padding-left: 6rem;
  padding-right: 6rem;
  z-index: 5;
}

.card-container {
  display: flex;
}

.image {
  display: block;
  width: 100%;
  user-select: none;
}
</style>
