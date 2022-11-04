<template>
  <section id="gallery_1" class="px-10">
    <v-row dense>
      <v-col cols="8">
        <div class="text">
          <div class="mb-4 h2">Immortalize your data on Filecoin</div>
        </div>
        <div class="image-card-container">
          <image-card label="01" image="/images/head-forward.svg" title="Avatars" />
          <image-card label="02" image="/images/stacked.svg" title="NFTs" />
        </div>
      </v-col>
      <v-col cols="4">
        <image-card class="mt-3" tall label="03" image="/images/archway.svg" title="Experiences" />
      </v-col>
      <v-col cols="8">
        <div class="image-card-container">
          <image-card label="04" image="/images/pentahedron.svg" title="User Content" />
          <image-card label="05" image="/images/cylinder.svg" title="Digital Assets" />
        </div>
        <image-card
          title="Many technologies across three layers: experiences, user capabilities, and infrastructure - are required to build the Metaverse." />
      </v-col>
      <v-col cols="4">
        <image-card label="06" image="/images/landscape-small.svg" title="Virtual Spaces" />
        <image-card label="07" image="/images/infrastructure.svg" title="Infrastructure" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import ImageCard from "~/components/app/ImageCard";

export default {
  name: "Gallery1",
  components: { ImageCard }
};
</script>

<style lang="scss" scoped>
#gallery_1 {
  position: relative;
  padding-top: 28.875rem;

  &:before {
    content: "";
    position: absolute;
    width: 822px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    filter: blur(60px);
    opacity: .6;
    z-index: 1;
    top: 25%;
    left: calc(50% - 55.625rem);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzE5IiBoZWlnaHQ9IjUyNCIgdmlld0JveD0iMCAwIDcxOSA1MjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMi4zOTg0IDE2QzE0Ni4zNDIgODguNjk4NCA0NDAuMDYzIDIzNi4yNzYgNzAzLjM5OCAyNDUiIHN0cm9rZT0iI0ZGNkQ0NCIgc3Ryb2tlLXdpZHRoPSIzMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMC4zOTg0IDE3MkM5OS4wMzk5IDIzMC40MTMgMzI3LjUzOCAzNDguOTkgNTMyLjM5OCAzNTYiIHN0cm9rZT0iIzQxMDBDQyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOC4zOTg0IDUwOC4yMTNDMTM2Ljc0NiA1MTAuODk4IDM5NS4yMzMgNTA4LjIxMyA1NjIuMzk4IDQ3NiIgc3Ryb2tlPSIjRkY2RDQ0IiBzdHJva2Utd2lkdGg9IjMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==");
  }

  &:after {
    top: 50%;
    right: calc(50% - 55.625rem);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIxIiBoZWlnaHQ9IjUwNiIgdmlld0JveD0iMCAwIDgyMSA1MDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03OTkuMzk4IDE3LjQ3NzFDNzAzLjc1NCAxNy40NzcxIDYwNC4wNTggNC45OTI3OSA1MTIuNjUgMzYuMDc4MkM0NDEuODUxIDYwLjE1NTIgMzgxLjQxMyA5OC45MDg4IDMxMy43NDkgMTI0LjAxMUMyMTUuNjQgMTYwLjQwOSAxMTAuODIyIDE5Ni4xNjUgMTUuMzk4NCAyMzkiIHN0cm9rZT0iI0ZGNkQ0NCIgc3Ryb2tlLXdpZHRoPSIzMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik04MTAuNzIxIDQxNS44MkM2ODEuMjUyIDQzNi4zMzEgNTQ0LjM1MSA0NDUuNDI2IDQyNS40NjIgNDk1LjYxNyIgc3Ryb2tlPSIjRkY2RDQ0IiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTc4MS4zOTggMTI4LjA5NUM3MjQuMDYxIDEyOC4wOTUgNjY0LjI5NCAxMjIuNTc3IDYwOS40OTYgMTM2LjMxNkM1NjcuMDUyIDE0Ni45NTcgNTMwLjgyIDE2NC4wODUgNDkwLjI1NyAxNzUuMTc5QzQzMS40NDEgMTkxLjI2NSAzNjguNjA0IDIwNy4wNjggMzExLjM5OCAyMjYiIHN0cm9rZT0iIzQxMDBDQyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=");
    content: "";
    position: absolute;
    width: 822px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    filter: blur(60px);
    opacity: .6;
    z-index: 1;
  }
}

.image-card-container {
  display: flex;
}
</style>
