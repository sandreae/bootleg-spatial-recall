<template>
  <div
    class="impulse_image--flex-column click"
    :style="{
      backgroundImage: 'url(' + selectedImpulse.imageFile + ')',
    }"
    :class="playing ? 'active' : ''"
    @click="togglePlay"
  >
    <div class="impulses_padding">
      <!-- <img src="../assets/images/clay-1.png" /> -->
    </div>
    <div class="impulses_info">
      <ImpulsesInfo />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedImpulse() {
      return this.$store.getters.selectedImpulse;
    },
    playing() {
      return this.$store.getters.playing;
    },
  },
  methods: {
    togglePlay() {
      this.$store.dispatch('togglePlay');
    },
  },
};
</script>

<style scoped>
.impulses_padding {
  flex: 10 1 auto;
}

.impulses_info {
  flex: 1 1 auto;
}

.impulse_image--flex-column {
  display: flex;
  max-width: 70vw;
  min-width: 70vw;
  max-height: 70vw;
  min-height: 70vw;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.active {
  filter: sepia(30%);
}

@media only screen and (min-width: 800px) {
  .impulse_image--flex-column {
    max-width: 70vh;
    min-width: 70vh;
    max-height: 70vh;
    min-height: 70vh;
  }
}
</style>
