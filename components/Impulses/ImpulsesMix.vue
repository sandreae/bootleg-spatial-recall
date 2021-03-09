<template>
  <div class="impulse-mix--flex-row">
    <div
      class="item"
      @click="decreaseMixLevel()"
      v-html="arrowLeft"
    ></div>
    <div
      v-for="n in length"
      :key="n"
      class="item"
      @click="setMixLevel(n)"
    >
      <span v-if="n !== level" v-html="sliderInactive"></span>
      <span v-else v-html="sliderActive"></span>
    </div>
    <div
      class="item"
      @click="increaseMixLevel()"
      v-html="arrowRight"
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
      length: 20,
      level: 10,
    };
  },
  computed: {
    ...mapState({
      level: (state) => state.mixLevel,
    }),
  },
  methods: {
    ...mapMutations({
      setMixLevel: 'state/setMixLevel',
      decreaseMixLevel: 'state/decreaseMixLevel',
      increaseMixLevel: 'state/increaseMixLevel',
    }),
  },
};
</script>

<style scoped>
.impulse-mix--flex-row {
  padding-top: 15px;
  flex: 0 0 30px;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
}
.item {
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  flex: 1 1 10px;
  font-size: 1em;
  cursor: pointer;
  z-index: 2;
}

/* .item:hover { */
/* margin: 0px !important;
  border: var(--secondary-bg-color) 2px solid;
  background-color: var(--secondary-bg-color);
  border-radius: 15px; */
/* } */

.item:hover::before {
  z-index: -1;
  content: '';
  background-color: var(--secondary-bg-color);
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  position: absolute;
  filter: blur(5px);
}

@media only screen and (min-width: 800px) {
  .item {
    font-size: 1.5em;
    flex: 1 1 15px;
    cursor: pointer;
  }
}
</style>
