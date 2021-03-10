<template>
  <div class="controls-wrapper--flex-row">
    <div class="button-fuzzy" @click="playImpulse">play impulse</div>
    <!-- <div class="button-fuzzy" @click="togglePlay">convolve</div> -->
    <div class="button-fuzzy" @click.prevent="downloadItem">
      download
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState({
      selectedImpulse: (state) => state.selectedImpulse,
      playing: (state) => state.playing,
    }),
  },
  methods: {
    ...mapMutations({
      togglePlay: 'togglePlay',
      playImpulse: 'playImpulse',
    }),
    downloadItem() {
      this.$axios
        .$get(this.selectedImpulse.audioFile, {
          responseType: 'blob',
        })
        .then((data) => {
          const blob = new Blob([data]);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${this.selectedImpulse.slug}.mp3`;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
          this.context.error(error);
        });
    },
  },
};
</script>

<style scoped>
.controls-wrapper--flex-row {
  padding: 6px;
  align-self: stretch;
  justify-content: space-around;
}
@media only screen and (min-width: 800px) {
}
</style>
