<template>
  <div class="picker--flex-column fuzzy">
    <div
      v-for="impulse in loadedImpulses"
      :key="impulse.name"
      class="picker_item click"
      :class="selectedImpulse.name === impulse.name ? 'selected' : ''"
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
    selectedImpulse() {
      return this.$store.getters.selectedImpulse;
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
.picker--flex-column {
  align-items: stretch;
  overflow: hidden;
  justify-content: space-around;
}

.selected {
  filter: sepia(50%);
  text-decoration: solid;
  color: burlywood;
}

.picker_item {
  cursor: pointer;
  flex: 0 1 20px;
  text-align: center;
  z-index: 1;
}
</style>
