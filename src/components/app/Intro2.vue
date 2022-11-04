<template>
  <section id="intro_2">
    <div class="px-6">
      <v-row dense>
        <v-col cols="5">
          <div class="image-container">
            <div class="image">
              <v-img src="/images/door-opening.png" />
            </div>
          </div>
          <div class="h3 mt-2">The Four Layers of the Metaverse</div>
        </v-col>
        <v-col cols="7">
          <card-list class="mx-6" :items="items" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import CardList from "~/components/app/CardList";

export default {
  name: "Intro2",
  components: { CardList },
  data () {
    return {
      items: [
        {
          number: "01",
          title: "Experiences & Apps",
          description: "Tasks and interactions people will do in a space"
        },
        {
          number: "02",
          title: "Spaces",
          description: "Spaces are the “rooms” or “worlds” in the Metaverse where we engage and interact"
        },
        {
          number: "03",
          title: "Interactions",
          description: "Mechanisms to communicate with others, express and prove who I am, and show what I own"
        },
        {
          number: "04",
          title: "Infrastructure",
          description: "Foundation of the Metaverse to operate, this includes compute, storage and others"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
}

.image:before {
  content: "";
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/perspective-grid-b.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  z-index: 0;
  transform: scaleY(1.05);
}
</style>
