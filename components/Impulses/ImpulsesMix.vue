<template>
  <div class="impulse-mix--flex-row">
    <div class="item">
      <div
        class="button button-fuzzy"
        @click="decreaseMixLevel()"
        v-html="ear"
      ></div>
    </div>
    <div class="item slider">
      <input
        id="mix"
        :value="level"
        type="range"
        name="mix"
        min="0"
        max="20"
        @change="onChange"
      />
    </div>
    <div class="item">
      <div
        class="button button-fuzzy"
        @click="increaseMixLevel()"
        v-html="speaker"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      impulsePlayer: null,
      playing: false,
      ear: '&#128066',
      speaker: '&#128266',
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
    onChange(e) {
      this.setMixLevel(parseInt(e.target.value));
    },
  },
};
</script>

<style scoped>
.impulse-mix--flex-row {
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
}

input {
  width: 100%;
}

.impulse-mix--flex-row div:nth-child(2n + 1) {
  display: flex;
  flex: 1 1 30px;
  justify-content: center;
}

.impulse-mix--flex-row div:nth-child(2) {
  flex: 4 1 30px;
}

.button {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  font-size: 2em;
  max-width: 1em;
}

@media only screen and (min-width: 800px) {
}
</style>
