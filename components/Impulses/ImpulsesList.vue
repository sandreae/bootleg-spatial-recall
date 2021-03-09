<template>
  <ul id="impulse-list">
    <li v-for="impulse in loadedImpulses" :key="impulse.name">
      {{ impulse.name }}
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      loadedImpulses: (state) => state.loadedImpulses,
    }),
  },
};
</script>

<style scoped></style>
