<template>
  <form class="form--flex-column" @submit.prevent="onSubmit">
    <AppButton type="submit">Logout</AppButton>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      this.$emit('logout');
    },
  },
};
</script>
<style scoped>
.form--flex-column {
  flex: 1;
  align-items: stretch;
  padding: 20px;
}
.form--flex-column :nth-child(1n) {
  z-index: 1;
}
</style>
