<template>
  <div class="controls-wrapper--flex-row">
    <div class="item button-fuzzy" @click="playImpulse">
      play impulse
    </div>
    <!-- <div class="button-fuzzy" @click="togglePlay">convolve</div> -->
    <div class="item button-fuzzy" @click.prevent="downloadItem">
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
          headers: {
            Authorization:
              'Bearer ' + this.$auth.strategy.token.get(),
          },
          responseType: 'blob',
        })
        .then((data) => {
          const blob = new Blob([data]);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          const splitUrl = this.selectedImpulse.audioFile.split('.');
          const fileType = splitUrl[splitUrl.length - 1];
          link.download = `${this.selectedImpulse.slug}.${fileType}`;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.item {
  -webkit-user-select: none;
  user-select: none;
}
.controls-wrapper--flex-row {
  padding: 6px;
  align-self: stretch;
  justify-content: space-around;
}
@media only screen and (min-width: 800px) {
}
</style>
