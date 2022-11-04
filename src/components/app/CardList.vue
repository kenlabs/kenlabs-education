<template>
  <div class="card-list">
    <div v-for="item in items" class="item">
      <div class="content">
        <div class="title">
          <div class="number" v-text="item.number" />
          <div class="text" v-text="item.title" />
        </div>
        <div class="description" v-text="item.description" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    margin: 0 0 1rem;
    padding: 1.875rem;
    border: 1px solid #fff;
    border-radius: 1.875rem;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;

        .number {
          font-family: "Space Grotesk";
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.4;
          margin-right: 1.75rem;
        }

        .text {
          background: linear-gradient(100deg, #ff6d44, #ffb26b 33%, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.4;
        }
      }

      .description {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.8;
      }
    }
  }
}
</style>
