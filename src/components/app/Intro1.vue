<template>
  <section id="intro_1">
    <div class="image px-6">
      <v-row dense>
        <v-col cols="6">
          <div class="h3 mb-2">Infrastructure for the Metaverse</div>
          <div class="description">
            The Metaverse is the next evolution of the web which will be comprised of interconnected digital spaces in
            which humans interact with a sense of presence and will have experiences and use applications.
            <br />
            <br />
            We believe it has to be an open, composable stack and run on a massively scaled, resilient, and
            interoperable infrastructure which has to enable real-time interactions.
            <br />
            <br />
            Four interconnected layers are required for the Metaverse.
          </div>
        </v-col>
        <v-col cols="6">
          <v-img src="/images/3d-skateboarder-kickflip.png" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
  name: "Intro1"
};
</script>

<style lang="scss" scoped>
#intro_1:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: calc(50% - 55.625rem);
  width: 822px;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzE5IiBoZWlnaHQ9IjUyNCIgdmlld0JveD0iMCAwIDcxOSA1MjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMi4zOTg0IDE2QzE0Ni4zNDIgODguNjk4NCA0NDAuMDYzIDIzNi4yNzYgNzAzLjM5OCAyNDUiIHN0cm9rZT0iI0ZGNkQ0NCIgc3Ryb2tlLXdpZHRoPSIzMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMC4zOTg0IDE3MkM5OS4wMzk5IDIzMC40MTMgMzI3LjUzOCAzNDguOTkgNTMyLjM5OCAzNTYiIHN0cm9rZT0iIzQxMDBDQyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOC4zOTg0IDUwOC4yMTNDMTM2Ljc0NiA1MTAuODk4IDM5NS4yMzMgNTA4LjIxMyA1NjIuMzk4IDQ3NiIgc3Ryb2tlPSIjRkY2RDQ0IiBzdHJva2Utd2lkdGg9IjMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==");
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  filter: blur(60px);
  opacity: .6;
  z-index: 1;
}

.description {
  margin-bottom: 1.75rem;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
}

.image:before {
  content: "";
  position: absolute;
  top: -6rem;
  right: 6rem;
  width: calc(40% - 2rem);
  height: 100%;
  background-image: url("/images/perspective-grid-a.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  z-index: 0;
  transform: scaleY(1.07);
}

</style>
