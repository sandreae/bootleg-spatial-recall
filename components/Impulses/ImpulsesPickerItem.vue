<template>
  <div
    class="picker-item-wrapper--flex-row"
    :class="selected ? 'selected' : ''"
    @click="setSelectedImpulse(impulse)"
  >
    <div>
      <!-- <a
        target="_blank"
        :download="impulse.slug"
        :href="impulse.audioFile"
        :class="selected ? '' : 'hidden'"
        >&#9660;</a
      > -->
    </div>
    <div class="click">{{ impulse.name }}</div>
    <div>
      <!-- <span :class="selected ? 'click' : 'hidden'">&#9656;</span> -->
    </div>
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

.picker-item-wrapper--flex-row {
  margin: 2px;
  justify-content: space-between;
  padding: 4px;
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
