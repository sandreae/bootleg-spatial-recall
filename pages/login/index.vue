<template>
  <div
    class="page-container--flex-column-centre"
    :class="disabled ? 'disabled' : ''"
  >
    <div class="wrapper--flex-column">
      <div class="form-container--flex-column fuzzy">
        <AppLoginForm
          v-if="!this.$auth.loggedIn"
          @login="onLogin"
          @validation="onValidation"
        />
        <AppLogout v-else @logout="onLogout" />
      </div>
    </div>
    <div class="message-container--flex-column-centre">
      <AppMessage :errors="errors" :messages="messages" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      errors: [],
      messages: [],
      disabled: false,
    };
  },
  methods: {
    async onLogin(user) {
      if (this.errors.length > 0) {
        return;
      }
      this.messages = [];
      this.disabled = true;
      try {
        await this.$auth.login({
          data: user,
        });
        this.$router.push({ path: '/impulses/edit' });
      } catch (err) {
        this.disabled = false;
        this.errors.push(err.response.data.message);
      } finally {
        this.disabled = false;
      }
    },
    async onLogout() {
      await this.$auth.logout();
    },
    onValidation(errors) {
      this.errors = errors;
    },
  },
};
</script>

<style scoped>
.page-container--flex-column-centre {
  justify-content: flex-start;
  align-items: stretch;
}

.form-container--flex-column {
  min-width: 50vw;
}

.message-container--flex-column-centre {
  max-width: 50vw;
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
}

@media only screen and (min-width: 800px) {
  .wrapper--flex-column {
    justify-content: flex-start;
    flex-flow: row-reverse;
  }
  .page-container--flex-column-centre {
    align-items: center;
    justify-content: center;
  }
  .form-container--flex-column {
    min-width: 40vw;
  }
}
</style>
