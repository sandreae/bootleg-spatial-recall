<template>
  <div
    :class="disabled ? 'disabled' : ''"
    class="page-container--flex-column-centre"
  >
    <div class="info-container--flex-column fuzzy">
      <ImpulsesUploadInfo :howto="howto" />
    </div>
    <div class="wrapper--flex-column-centre">
      <div class="form-container--flex-column fuzzy">
        <ImpulsesForm
          v-model="errors"
          @submit="onSubmitted"
          @validation="onValidation"
        />
      </div>
      <div class="message-container--flex-column-centre">
        <AppMessage :errors="errors" :messages="messages" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const howto = await $content('howto').fetch();

    return {
      howto,
    };
  },
  data: () => {
    return {
      errors: [],
      messages: [],
      disabled: false,
    };
  },
  methods: {
    onSubmitted(postData) {
      if (this.errors.length > 0) {
        return;
      }
      this.messages.push('Uploading');
      this.disabled = true;
      const formData = new FormData();
      Object.keys(postData).forEach((key) => {
        formData.append(key, postData[key]);
      });
      this.$axios
        .$post('/api/impulses', formData)
        .then((result) => {
          this.disabled = false;
          this.messages = [];
          this.$store.dispatch('updateImpulses');
          this.$router.push({ path: '/' });
        })
        .catch((e) => {
          this.disabled = false;
          this.messages = [];
          this.errors.push(e.message);
        });
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
}

.error {
  border: solid 2px red;
  z-index: 1;
  margin: 10px;
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
}

@media only screen and (min-width: 800px) {
  .page-container--flex-column-centre {
    flex-flow: row-reverse;
  }
  .info-container--flex-column {
    max-width: 50vw;
  }
  .form-container--flex-column {
    max-width: 40vw;
  }
}
</style>
