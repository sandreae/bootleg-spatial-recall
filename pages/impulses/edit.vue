<template>
  <div class="page-container--flex-column-centre">
    <div class="wrapper--flex-column">
      <div class="picker-container--flex-column-centre">
        <ImpulsesPicker />
      </div>
      <div class="form-container--flex-column fuzzy">
        <ImpulsesForm
          v-model="errors"
          :type="'edit'"
          :impulse="impulse"
          @submit="onSubmitted"
          @delete="onDelete"
          @validation="onValidation"
        />
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
      impulse: null,
      disabled: false,
    };
  },
  computed: {
    selectedImpulse() {
      return this.$store.getters.selectedImpulse;
    },
  },
  watch: {
    selectedImpulse(a, b) {
      this.impulse = this.$store.getters.selectedImpulse;
    },
  },
  methods: {
    onSubmitted(postData, id) {
      if (this.errors.length > 0) {
        return;
      }
      this.messages.push('Updating');
      this.disabled = true;
      this.$axios
        .$patch(`/api/impulses/${id}`, postData)
        .then(() => {
          this.disabled = false;
          this.$store.dispatch('updateImpulses');
          this.messages = [];
          this.messages.push('Impulses updated succesfully');
        })
        .catch((e) => {
          this.disabled = false;
          this.messages = [];
          this.errors.push(e.message);
        });
    },
    onDelete(id) {
      if (
        !window.confirm('Do you really want to delete this impulse?')
      ) {
        return;
      }
      this.messages.push('Deleting');
      this.disabled = true;

      this.$axios
        .$delete(`/api/impulses/${id}`)
        .then(() => {
          this.disabled = false;
          this.$store.dispatch('updateImpulses');
          this.messages = [];
          this.messages.push('Impulses deleted!');
        })
        .catch((e) => {
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
  align-items: stretch;
}

.form-container--flex-column {
  min-width: 50vw;
}

.message-container--flex-column-centre {
  max-width: 50vw;
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
  .picker-container--flex-column-centre {
    flex: 1;
    justify-content: center;
    max-width: 30vw;
  }
  .form-container--flex-column {
    min-width: 40vw;
  }
}
</style>
