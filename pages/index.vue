<template>
  <section class="impulses-page--flex-row-centre">
    <div class="impulses-page_content--flex-column-centre">
      <div
        class="impulses-page_details--flex-column"
        :style="{
          backgroundImage: 'url(' + selectedImpulse.imageFile + ')',
        }"
      >
        <div class="impulses-info_padding"></div>
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
export default {
  head() {
    return {
      title: 'Impulses',
    };
  },
  computed: {
    impulses() {
      return this.$store.getters.loadedImpulses;
    },
    selectedImpulse(impulse) {
      return this.$store.getters.selectedImpulse;
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
