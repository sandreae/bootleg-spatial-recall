<template>
  <form class="form--flex-column" @submit.prevent="onSubmit">
    <AppControlInput v-model="user.email">Email</AppControlInput>
    <AppControlInput v-model="user.password" type="password"
      >Password</AppControlInput
    >
    <AppButton type="submit">Login</AppButton>
  </form>
</template>

<script>
export default {
  data() {
    return { user: { email: null, password: null } };
  },
  methods: {
    onSubmit() {
      this.checkForm();
      this.$emit('validation', this.errors);
      if (this.errors.length === 0) {
        this.$emit('login', this.user);
      }
    },
    checkForm() {
      this.errors = [];

      if (!this.user.email) {
        this.errors.push('Email required.');
      }
      if (!this.user.password) {
        this.errors.push('Password required');
      }
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
