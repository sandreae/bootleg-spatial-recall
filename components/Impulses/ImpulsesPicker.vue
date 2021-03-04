<template>
  <div class="impulse-info-container--flex-column">
    <div
      v-for="impulse in loadedImpulses"
      :key="impulse.name"
      @click="setSelectedImpulse(impulse)"
    >
      {{ impulse.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loadedImpulses() {
      return this.$store.getters.loadedImpulses;
    },
  },
  methods: {
    setSelectedImpulse(impulse) {
      this.$store.commit('setSelectedImpulse', impulse);
    },
  },
};
</script>

<style scoped>
.impulse-info-container--flex-column {
  align-items: stretch;
  overflow: scroll;
}

.impulse-info-container--flex-column div:nth-child(1n) {
  flex: 1 0 50px;
  border: solid violet;
  margin: 2px;
  text-align: center;
}
</style>
