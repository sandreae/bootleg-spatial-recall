<template>
  <ul id="impulse-list">
    <li v-for="impulse in loadedImpulses" :key="impulse.name">
      {{ impulse.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loadedImpulses() {
      return this.$store.getters.loadedImpulses;
    },
  },
};
</script>

<style scoped></style>
