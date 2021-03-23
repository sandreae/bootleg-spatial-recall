<template>
  <div v-if="$fetchState.pending" class="page-container--flex-column">
    Loading impulses...
  </div>
  <div
    v-else-if="$fetchState.error"
    class="page-container--flex-column"
  >
    Error loading impulses...
  </div>
  <section v-else class="page-container--flex-column">
    <div
      class="impulse-container--flex-column-centre"
      :class="disabled ? 'disabled' : ''"
    >
      <ImpulsesDetails />
      <ImpulsesControls />
      <ImpulsesMix />
    </div>
    <div class="picker-container--flex-column-centre">
      <ImpulsesPicker />
      <nuxt-content :document="home" />
    </div>
  </section>
</template>

<script>
import { ImpulsePlayer } from '@/assets/js/audioUtils.js';
import { mapState } from 'vuex';
import sample from '@/assets/audio/BootlegSpatialRecall.mp3';

export default {
  async asyncData({ $content }) {
    const home = await $content('home').fetch();
    return {
      home,
    };
  },
  data() {
    return {
      disabled: true,
      impulsePlayer: null,
    };
  },
  async fetch() {
    if (this.impulses.length > 0) {
      // GET all impulses
      const impulseFile = await this.$axios.$get(
        this.selectedImpulse.audioFile,
        {
          responseType: 'blob',
        },
      );
      const sampleFile = await this.$axios.$get(sample, {
        responseType: 'blob',
      });
      this.impulsePlayer = new ImpulsePlayer();
      await this.impulsePlayer.init(sampleFile, impulseFile);
      this.disabled = false;
    }
  },
  fetchOnServer: false,
  head() {
    return {
      title: 'Impulses',
    };
  },
  computed: {
    ...mapState({
      impulses: (state) => state.loadedImpulses,
      selectedImpulse: (state) => state.selectedImpulse,
      mixLevel: (state) => state.mixLevel,
      playing: (state) => state.playing,
      playImpulse: (state) => state.playImpulse,
    }),
  },
  watch: {
    async selectedImpulse(newImpulse, oldCount) {
      const impulseFile = await this.$axios.$get(
        this.selectedImpulse.audioFile,
        {
          responseType: 'blob',
        },
      );
      await this.impulsePlayer.setNewImpulse(impulseFile);
    },
    mixLevel(newLevel, oldCount) {
      this.impulsePlayer.mixLevel(newLevel);
    },
    async playing(isPlaying, wasPlaying) {
      if (isPlaying === wasPlaying) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
      await this.impulsePlayer.togglePlay();
      this.disabled = false;
    },
    async playImpulse() {
      this.impulsePlayer.impulseNode.onended = () => {};
      await this.impulsePlayer.playImpulse();
    },
  },
};
</script>

<style scoped>
.page-container--flex-column {
  max-width: 70vw;
  justify-content: flex-start;
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
}

@media only screen and (min-width: 800px) {
  .page-container--flex-column {
    flex: 1;
    min-width: 100vw;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-around;
  }
  .impulse-container--flex-column-centre {
    align-items: stretch;
  }
  .picker-container--flex-column-centre {
    max-width: 30vw;
  }
}
</style>
