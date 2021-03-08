<template>
  <div class="page--flex-column-centre fuzzy">
    <div class="content--flex-column-centre">
      <nuxt-content :document="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.content--flex-column-centre {
  z-index: 1;
  padding: 20px;
}

@media only screen and (min-width: 800px) {
  .page--flex-column-centre {
    max-width: 90vw;
  }
}
</style>
