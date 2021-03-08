<template>
  <div class="picker-container--flex-column fuzzy">
    <div class="picker--flex-column" @scroll="onScroll">
      <div
        v-for="(impulse, i) in impulses"
        :key="i"
        class="picker_item click"
        :class="
          selectedImpulse.name === impulse.name ? 'selected' : ''
        "
        @click="setSelectedImpulse(impulse)"
      >
        {{ impulse.name }}
      </div>
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
  data() {
    return {
      loops: 1,
      impulses: this.LoopArray(this.$store.getters.loadedImpulses, 3),
    };
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
    onScroll(el) {
      if (el.target.scrollTop >= el.target.scrollTopMax - 20) {
        let impulseLoop = this.impulses;
        impulseLoop = impulseLoop.concat(this.loadedImpulses);
        this.impulses = impulseLoop;
      }
    },
    setSelectedImpulse(impulse) {
      this.$store.commit('setSelectedImpulse', impulse);
    },
    LoopArray(array, num) {
      const dupArray = array;
      let loopedArray = [];
      for (let i = 0; i < num; i++) {
        loopedArray = array.concat(dupArray);
      }
      return loopedArray;
    },
  },
};
</script>

<style scoped>
.picker--flex-column {
  flex: 1 0 auto;
  min-width: 50vw;
  align-items: stretch;
  justify-content: flex-start;
  max-height: 200px;
  overflow: auto;
  scroll-behavior: smooth;
}

.picker--flex-column::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.picker--flex-column {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.selected {
  border-radius: 10px;
  text-decoration: solid;
  font-weight: bold;
  border: solid 2px black;
  margin: 0px !important;
}

.picker_item {
  flex: 0 1 auto;
  margin: 2px;
  padding: 4px;
  cursor: pointer;
  text-align: center;
  z-index: 1;
}

@media only screen and (min-width: 800px) {
  .picker--flex-column {
    min-width: 30vw;
  }
}
</style>
