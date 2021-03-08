<template>
  <div class="message-container--flex-column-centre">
    <div v-if="errors.length" class="error notification">
      <b>Please check the following error(s):</b>
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </div>
    <div v-if="messages.length" class="message notification">
      <div v-for="message in messages" :key="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.error {
  border: solid 2px red;
  z-index: 1;
}

.message {
  border: solid 2px green;
  z-index: 1;
}
</style>
