<template>
  <div class="impulse-info-container--flex-column">
    <div>{{ impulse.name }}</div>
    <div>{{ impulse.location }}</div>
    <div>{{ impulse.date }}</div>
    <div>{{ impulse.description }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    impulse() {
      return this.$store.state.selectedImpulse;
    },
  },
};
</script>

<style scoped>
.impulse-info-container--flex-column {
  align-self: stretch;
  align-items: flex-start;
  background-color: darkslategray;
  padding: 0 10px 0 10px;
}
</style>
