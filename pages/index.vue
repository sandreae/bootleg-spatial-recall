<template>
  <section class="impulses-page--flex-row-centre">
    <div class="impulses-page_content--flex-column-centre">
      <p v-if="$fetchState.pending">Fetching implses...</p>
      <div
        v-else
        class="impulses-page_details--flex-column"
        :style="{
          backgroundImage: 'url(' + selectedImpulse.imageFile + ')',
        }"
      >
        <div class="impulses-info_padding" @click="togglePlay">
          {{ !playing ? 'PLAY' : 'STOP' }}
        </div>
        <div class="impulses-info_content">
          <ImpulsesInfo />
        </div>
      </div>
      <div class="impulses-page_picker--flex-column">
        <ImpulsesPicker />
      </div>
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
      playing: false,
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
      console.log(`New impulse called ${newImpulse.name}, yay!`);
    },
  },
  methods: {
    togglePlay() {
      if (this.playing) {
        this.impulsePlayer.stop();
        this.impulsePlayer.setSampleNode(this.sampleFile).then(() => {
          this.playing = false;
          console.log('New buffer created');
        });
      } else {
        this.impulsePlayer.play();
        this.playing = true;
      }
    },
  },
};
</script>

<style scoped>
.impulses-page--flex-row-centre {
  height: 100vh;
  width: 100vw;
  align-items: stretch;
}

.impulses-page_content--flex-column-centre {
  flex: 0 1 80vw;
  align-items: stretch;
  justify-content: space-evenly;
}

.impulses-info_padding {
  flex: 10 1 auto;
}

.impulses-info_content {
  flex: 1 1 auto;
}

.impulses-page_details--flex-column {
  flex: 1 0 auto;
  max-width: 80vw;
  max-height: 80vw;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.impulses-page_picker--flex-column {
  flex: 1 1 auto;
  max-height: 30vh;
  align-items: stretch;
}

@media only screen and (min-width: 800px) {
  .impulses-page_content--flex-column-centre {
    flex: 1 1 100vw;
    align-items: center;
    background-color: lightblue;
    flex-direction: row-reverse;
    justify-content: space-around;
  }
  .impulses-page_details--flex-column {
    flex: 0 0 80vh;
    min-height: 80vh;
  }

  .impulses-page_picker--flex-column {
    flex: 0 1 30vw;
    max-height: 80vh;
  }
}
</style>
