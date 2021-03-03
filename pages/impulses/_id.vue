<template>
  <section class="impulse-page--flex-row-centre">
    <div class="impulse-single--flex-column-centre"></div>
  </section>
</template>

<script>
// CONTENT //
// <h2 class="info">
//   {{ impulse.name }}
// </h2>
// <img :src="impulse.imageFile" />
// <nuxt-link class="button" to="/impulses"> Impulses </nuxt-link>

export default {
  head() {
    return {
      title: `Impulse: ${this.impulse.name}`,
    };
  },
  computed: {
    impulse() {
      const impulseArray = this.$store.getters.loadedImpulses.filter(
        (impulse) => impulse._id === this.$route.params.id,
      );
      return impulseArray[0];
    },
  },
};
</script>

<style scoped>
.impulse-page--flex-row-centre {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  margin-top: 30px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 30px;
}
</style>
