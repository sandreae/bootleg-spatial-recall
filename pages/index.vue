<template>
  <div v-if="$fetchState.pending" class="page-container--flex-column">
    Fetching impulses...
  </div>
  <div
    v-else-if="$fetchState.error"
    class="page-container--flex-column"
  >
    Error loading impulses...
  </div>
  <section v-else class="page-container--flex-column">
    <div class="impulse-container--flex-column-centre">
      <ImpulsesDetails />
      <ImpulsesMix />
    </div>
    <div class="picker-container--flex-column-centre">
      <nuxt-content :document="home" />
      <ImpulsesPicker />
    </div>
  </section>
</template>

<script>
// import { ImpulsePlayer } from '@/assets/js/audioUtils.js';
import { mapState } from 'vuex';
// import sample from '@/assets/audio/arnold_circus_demo.mp3';

export default {
  async asyncData({ $content }) {
    const home = await $content('home').fetch();
    return {
      home,
    };
  },
  data() {
    return {
      impulsePlayer: null,
    };
  },
  async fetch() {
    // const promises = await this.impulses.map((impulse) => {
    //   return new Promise(function (resolve, reject) {
    //     const img = new Image();
    //     img.src = impulse.imageFile;
    //     img.onload = resolve();
    //     img.onerror = reject(new Error('Image did not load'));
    //   });
    // });
    // await Promise.all(promises);
    // let impulseFile;
    // const sampleFile = await fetch(sample);
    // if (this.selectedImpulse.audioFile) {
    //   impulseFile = await fetch(this.selectedImpulse.audioFile);
    // }
    // this.impulsePlayer = new ImpulsePlayer();
    // this.impulsePlayer.init(sampleFile, impulseFile);
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
    }),
  },
  watch: {
    selectedImpulse(newImpulse, oldCount) {
      fetch(newImpulse.audioFile)
        .then((impulseFile) => {
          return this.impulsePlayer.setConvolverNode(impulseFile);
        })
        .then(() => {
          this.impulsePlayer.makeConnections();
        });
    },
    mixLevel(newLevel, oldCount) {
      this.impulsePlayer.mixLevel(newLevel);
    },
    playing(isPlaying, wasPlaying) {
      if (isPlaying === wasPlaying) {
        return;
      }
      if (isPlaying) {
        this.impulsePlayer.play();
      } else {
        this.impulsePlayer.stop();
        this.impulsePlayer.setSampleNode(this.sampleFile);
        this.impulsePlayer.makeConnections();
      }
    },
  },
};
</script>

<style scoped>
.page-container--flex-column {
  flex: 0 1 auto;
  max-width: 70vw;
  justify-content: flex-start;
}
.impulse-container--flex-column-centre {
  flex: 1;
}
.picker-container--flex-column-centre {
  flex: 1;
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
    flex: 0 1 auto;
    justify-content: space-around;
    max-width: 60vw;
  }
  .picker-container--flex-column-centre {
    flex: 1;
    justify-content: center;
    max-width: 30vw;
  }
}
</style>
