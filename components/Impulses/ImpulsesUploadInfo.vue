<template>
  <div class="info--flex-column">
    <nuxt-content :document="howto" />
  </div>
</template>

<script>
export default {
  props: {
    howto: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.info--flex-column {
  z-index: 1;
  padding: 20px;
}

@media only screen and (min-width: 800px) {
  .info--flex-column {
    flex: 1;
    max-width: 40vw;
  }
}
</style>
