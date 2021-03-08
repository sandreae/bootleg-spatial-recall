<template>
  <div
    class="details--flex-column click"
    :style="{
      backgroundImage: 'url(' + selectedImpulse.imageFile + ')',
    }"
    :class="playing ? 'active' : ''"
    @click="togglePlay"
  >
    <div class="padding">
      <!-- <img src="../assets/images/clay-1.png" /> -->
    </div>
    <div class="info">
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
.padding {
  flex: 10 1 auto;
}

.info {
  flex: 1;
}

.details--flex-column {
  border-radius: 25px;
  padding: 8px;
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
  padding: 0px i !important;
  border: solid var(--secondary-bg-color) 8px;
  background-color: var(--secondary-bg-color);
}

@media only screen and (min-width: 800px) {
  .details--flex-column {
    max-width: 70vh;
    min-width: 70vh;
    max-height: 70vh;
    min-height: 70vh;
  }
}
</style>
