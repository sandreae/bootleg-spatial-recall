<template>
  <div class="info--flex-column">
    <!-- <div class="name">{{ impulse.name }}</div> -->
    <div class="location">{{ impulse.location }}</div>
    <div class="date">
      {{ new Date(impulse.date).toDateString() }}
    </div>
    <div class="description">{{ impulse.description }}</div>
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
.info--flex-column {
  align-self: stretch;
  align-items: flex-start;
  color: aliceblue;
  padding: 0 10px 0 10px;
}

.name {
  font-weight: bold;
}
.location {
  font-weight: bold;
}
.date {
  font-style: italic;
}
.description {
  font-size: 0.8em;
}
</style>
