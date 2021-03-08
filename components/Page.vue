<template>
  <div class="wrapper--flex-column">
    <div class="page--flex-column-centre fuzzy">
      <div class="content--flex-column-centre">
        <nuxt-content :document="content" />
      </div>
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
  margin-top: 10px;
}
.page--flex-column-centre {
  justify-content: flex-start;
}

@media only screen and (min-width: 800px) {
  .page--flex-column-centre {
    max-width: 90vw;
  }
  .page--flex-column-centre {
    margin: 30px;
  }
  .wrapper--flex-column {
    justify-content: center;
  }
}
</style>
