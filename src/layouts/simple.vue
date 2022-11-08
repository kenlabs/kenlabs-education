<template>
  <v-app>
    <div class="main">
      <v-container>
        <nuxt />
      </v-container>
    </div>
  </v-app>
</template>

<style lang="scss">
@font-face {
  font-family: "Space Grotesk";
  src: local("Space Grotesk"),
  url(~assets/fonts/SpaceGrotesk-VariableFont.ttf) format("truetype");
}

.main {
  font-family: "Space Grotesk";
  font-size: 16px;
  line-height: 35px;
  letter-spacing: .03em;
  color: #fff;
  background-color: #16131a;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

</style>
