<template>
  <div class="picker-container--flex-column fuzzy">
    <div class="picker--flex-column" @scroll="onScroll">
      <ImpulsesPickerItem
        v-for="(impulse, i) in loopedImpulses"
        :key="i"
        :impulse="impulse"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return { loops: 10 };
  },
  computed: {
    ...mapState({
      loadedImpulses: (state) => state.loadedImpulses,
      loopedImpulses() {
        let impulses = this.loadedImpulses;
        for (let i = 0; i < this.loops; i++) {
          impulses = impulses.concat(this.loadedImpulses);
        }
        return impulses;
      },
    }),
  },
  methods: {
    onScroll(el) {
      if (el.target.scrollTop >= el.target.scrollTopMax / 2) {
        this.loops += 10;
      }
    },
  },
};
</script>

<style scoped>
.picker--flex-column {
  flex: 1 0 200px;
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
