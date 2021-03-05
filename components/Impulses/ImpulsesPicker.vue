<template>
  <div class="picker--flex-column">
    <div
      v-for="impulse in loadedImpulses"
      :key="impulse.name"
      class="picker_item click"
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
.picker--flex-column {
  position: relative;
  align-items: stretch;
  overflow: hidden;
  justify-content: space-around;
  padding: 10px;
}

.picker--flex-column::before {
  content: '';
  background-color: var(--main-bg-color);
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: absolute;
  filter: blur(6px);
}

.picker_item {
  cursor: pointer;
  flex: 0 1 20px;
  text-align: center;
  z-index: 1;
}
</style>
