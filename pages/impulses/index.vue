<template>
  <section class="impulses-page--flex-row-centre">
    <div class="impulses-page_content--flex-column-centre">
      <div class="impulses-page_details--flex-column">
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
// CONTENT //
// <ul class="impulses-list">
//   <li
//     v-for="(impulse, index) in impulses"
//     :key="index"
//     class="impulse-item"
//   >
//     <nuxt-link
//       :to="{
//         name: 'impulses-id',
//         params: { id: impulse._id },
//       }"
//     >
//       {{ impulse.name }}
//     </nuxt-link>
//   </li>
// </ul>

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
  },
};
</script>

<style scoped>
.impulses-page--flex-row-centre {
  height: 100vh;
  align-items: stretch;
  padding: 40px 10px 40px 10px;
}

.impulses-page_content--flex-column-centre {
  flex: 0 1 auto;
}

.impulses-info_padding {
  flex: 10 1 auto;
}

.impulses-info_content {
  flex: 1 1 auto;
}

.impulses-page_details--flex-column {
  flex: 0 1 auto;
  justify-content: flex-end;
  height: 80vw;
  width: 80vw;
  max-height: 80vh;
  max-width: 80vh;
  background-color: darkred;
}

.impulses-page_picker--flex-column {
  flex: 1 0 auto;
  padding-top: 30px;
  height: 10vh;
  width: 80vw;
  max-width: 80vh;
  align-items: stretch;
}
</style>
