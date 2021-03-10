<template>
  <div
    class="picker-item-wrapper--flex-column"
    :class="selected ? 'selected' : ''"
    @click="setSelectedImpulse(impulse)"
  >
    <div class="click">{{ impulse.name }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    impulse: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      selectedImpulse: (state) => state.selectedImpulse,
    }),
    selected() {
      const selected =
        this.selectedImpulse.name === this.impulse.name;
      return selected;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedImpulse: 'setSelectedImpulse',
    }),
  },
};
</script>

<style scoped>
.selected {
  border-radius: 10px;
  text-decoration: solid;
  font-weight: bold;
  border: solid 2px black;
  margin: 0px !important;
}

.picker-item-wrapper--flex-column {
  flex: 0 0 30px;
  justify-content: space-between;
  cursor: pointer;
  text-align: center;
  z-index: 1;
}

.hidden {
  display: none;
}

@media only screen and (min-width: 800px) {
  .picker--flex-column {
    min-width: 30vw;
  }
}
</style>
