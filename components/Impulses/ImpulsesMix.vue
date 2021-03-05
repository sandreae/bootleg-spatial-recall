<template>
  <div class="impulse-mix-container--flex-row">
    <div
      class="item"
      @click="decreaseLevel()"
      v-html="arrowLeft"
    ></div>
    <div
      v-for="n in length"
      :key="n"
      class="item"
      @click="setLevel(n)"
    >
      <span v-if="n !== level" v-html="sliderInactive"></span>
      <span v-else v-html="sliderActive"></span>
    </div>
    <div
      class="item"
      @click="increaseLevel()"
      v-html="arrowRight"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      impulsePlayer: null,
      playing: false,
      sliderInactive: '&#x2504',
      sliderActive: '&#x2505',
      arrowLeft: '&#5176',
      arrowRight: '&#5171',
      length: 20,
      level: 10,
    };
  },
  methods: {
    setLevel(n) {
      this.level = n;
      this.$store.commit('setMixLevel', n);
    },
    increaseLevel() {
      this.level = this.level += 1;
      this.$store.commit('setMixLevel', this.level);
    },
    decreaseLevel() {
      this.level = this.level -= 1;
      this.$store.commit('setMixLevel', this.level);
    },
  },
};
</script>

<style scoped>
.impulse-mix-container--flex-row {
  flex: 0 0 30px;
  align-self: stretch;
  align-items: flex-start;
  justify-content: stretch;
}
.item {
  -webkit-user-select: none;
  user-select: none;
  flex: 1 1 10px;
  font-size: 1em;
  cursor: pointer;
}

.item:hover {
  font-weight: bold;
}

@media only screen and (min-width: 800px) {
  .item {
    font-size: 1.5em;
    flex: 1 1 10px;
    cursor: pointer;
  }
}
</style>
