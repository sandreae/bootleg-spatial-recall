<template>
  <div class="impulse-mix--flex-row">
    <div
      class="item button-fuzzy ear"
      @click="decreaseMixLevel()"
      v-html="arrowLeft"
    ></div>
    <div
      v-for="n in length"
      :key="n"
      class="item button-fuzzy"
      @click="setMixLevel(n)"
    >
      <span v-if="n !== level" v-html="sliderInactive"></span>
      <span v-else v-html="sliderActive"></span>
    </div>
    <div
      class="item button-fuzzy ear"
      @click="increaseMixLevel()"
      v-html="speaker"
    ></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      impulsePlayer: null,
      playing: false,
      sliderInactive: '&#x2504',
      sliderActive: '&#x2505',
      arrowLeft: '&#128066',
      arrowRight: '&#128066',
      speaker: '&#128266',
      length: 20,
    };
  },
  computed: {
    ...mapState({
      level: (state) => state.mixLevel,
    }),
  },
  methods: {
    ...mapMutations({
      setMixLevel: 'setMixLevel',
      decreaseMixLevel: 'decreaseMixLevel',
      increaseMixLevel: 'increaseMixLevel',
    }),
  },
};
</script>

<style scoped>
.impulse-mix--flex-row {
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
}
.item {
  -webkit-user-select: none;
  user-select: none;
  flex: 1 1 15px;
  font-size: 0.8em;
}

.ear {
  font-size: 2em;
}

@media only screen and (min-width: 800px) {
  .item {
    font-size: 1.5em;
    flex: 1 1 15px;
    cursor: pointer;
  }
  .ear {
    font-size: 2em;
  }
}
</style>
