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
  text-align: justify;
  z-index: 1;
  margin: 10px;
}
.page--flex-column-centre {
  justify-content: flex-start;
}

@media only screen and (min-width: 800px) {
  .content--flex-column-centre {
    margin: 20px;
  }
  .page--flex-column-centre {
    max-width: 70vw;
  }
  .page--flex-column-centre {
    margin: 30px;
    font-size: 1.2em;
  }
  .wrapper--flex-column {
    justify-content: center;
  }
}
</style>
