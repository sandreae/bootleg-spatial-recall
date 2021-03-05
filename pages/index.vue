<template>
  <p v-if="$fetchState.pending">Fetching impulses...</p>
  <p v-else-if="$fetchState.error">Error loading impulses...</p>
  <section v-else class="impulses-page--flex-column">
    <div class="impulses-page_impulse--flex-column-centre">
      <ImpulsesDetails />
      <ImpulsesMix />
    </div>
    <div class="impulses-page_picker--flex-column">
      <ImpulsesPicker />
    </div>
  </section>
</template>

<script>
import { ImpulsePlayer } from '@/assets/js/audioUtils.js';
import sample from '@/assets/audio/arnold_circus_demo.mp3';

export default {
  data() {
    return {
      impulsePlayer: null,
    };
  },
  async fetch() {
    const promises = await this.$store.getters.loadedImpulses.map(
      (impulse) => {
        return new Promise(function (resolve, reject) {
          const img = new Image();

          img.src = impulse.imageFile;
          img.onload = resolve();
          img.onerror = reject(new Error('Image did not load'));
        });
      },
    );
    await Promise.all(promises);
    let impulseFile;
    const sampleFile = await fetch(sample);
    if (this.selectedImpulse.audioFile) {
      impulseFile = await fetch(this.selectedImpulse.audioFile);
    }
    this.impulsePlayer = new ImpulsePlayer();
    this.impulsePlayer.init(sampleFile, impulseFile);
  },
  fetchOnServer: false,
  head() {
    return {
      title: 'Impulses',
    };
  },
  computed: {
    impulses() {
      return this.$store.getters.loadedImpulses;
    },
    selectedImpulse() {
      return this.$store.getters.selectedImpulse;
    },
    mixLevel() {
      return this.$store.getters.mixLevel;
    },
    playing() {
      return this.$store.getters.playing;
    },
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
.impulses-page--flex-column {
  flex: 1 1 auto;
  max-width: 70vw;
  padding-top: 30px;
  justify-content: space-around;
}
.impulses-page_impulse--flex-column-centre {
  flex: 1 1 auto;
  max-height: 60vh;
}
.impulses-page_picker--flex-column {
  flex: 1 1 auto;
  max-height: 20vh;
  align-items: stretch;
}

@media only screen and (min-width: 800px) {
  .impulses-page--flex-column {
    max-width: 100vw;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-around;
  }
  .impulses-page_impulse--flex-column-centre {
    flex: 0 1 auto;
    justify-content: space-around;
    max-width: 60vw;
  }
  .impulses-page_picker--flex-column {
    flex: 1 1 auto;
    max-height: 80vh;
    max-width: 30vw;
  }
}
</style>
