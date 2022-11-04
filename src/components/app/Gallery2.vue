<template>
  <section id="gallery_2" class="px-10">
    <v-row dense>
      <v-col cols="8">
        <div class="text">
          <div class="mb-4 text-right h2">The Filecoin stack offers unique benefits to build an open Metaverse</div>
        </div>
      </v-col>
      <v-col cols="4">
        <info-card label="01" title="Resilience"
                   desc="Free from outages or censorship, Filecoin is a decentralized network without a single point-of-failure." />
      </v-col>
      <v-col cols="12">
        <div class="card-container">
          <info-card label="02" title="Availability"
                     desc="Data remains available over time thanks to the Filecoin incentive structure, making it the perfect place to store your most important assets and backups" />
          <info-card label="03" title="Competitive Prices"
                     desc="Prices for storage and retrieval are determined by supply and demand, where providers compete based on their storage, reliability, and speed" />
          <info-card label="04" title="Programmable Storage"
                     desc="Smart contract enables compute - directly where data is stored. This allows for new use cases like permissions on assets, new Metaverse mechanics or data DAOs" />
        </div>
      </v-col>
      <v-col cols="4">
        <info-card label="05" title="Decoupled"
                   desc="Infrastructure is detached from any project or developer, allowing digital assets exist for multiple generations" />
      </v-col>
      <v-col cols="8">
        <img class="px-6 image " src="/images/arches.svg" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import ImageCard from "~/components/app/ImageCard";
import InfoCard from "~/components/app/InfoCard";

export default {
  name: "Gallery2",
  components: { InfoCard, ImageCard }
};
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
}

.image {
  display: block;
  width: 100%;
  user-select: none;
}
</style>
