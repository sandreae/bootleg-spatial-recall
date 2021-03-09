<template>
  <div
    class="page-container--flex-column-centre"
    :class="disabled ? 'disabled' : ''"
  >
    <div class="wrapper--flex-column">
      <div class="picker-container--flex-column-centre">
        <ImpulsesPicker />
      </div>
      <div class="form-container--flex-column fuzzy">
        <ImpulsesForm
          v-model="errors"
          :type="'edit'"
          :impulse="selectedImpulse"
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
import { mapState } from 'vuex';

export default {
  middleware: 'auth',
  data: () => {
    return {
      errors: [],
      messages: [],
      disabled: false,
    };
  },
  computed: {
    ...mapState({
      selectedImpulse: (state) => state.selectedImpulse,
    }),
  },
  methods: {
    async onSubmitted(postData, id) {
      if (this.errors.length > 0) {
        return;
      }
      this.messages.push('Updating');
      this.disabled = true;

      try {
        await this.$axios.$patch(`/api/impulses/${id}`, postData);
        this.messages = [];
        this.messages.push('Impulses updated succesfully');
        this.$store.dispatch('updateImpulses');
      } catch (error) {
        this.messages = [];
        this.errors.push(error.result.data.message);
      } finally {
        this.disabled = false;
      }
    },
    async onDelete(id) {
      if (
        !window.confirm('Do you really want to delete this impulse?')
      ) {
        return;
      }

      this.messages.push('Deleting');
      this.disabled = true;

      try {
        await this.$axios.$delete(`/api/impulses/${id}`);
        this.messages = [];
        this.messages.push('Impulses deleted!');
        this.$store.dispatch('updateImpulses');
      } catch (error) {
        this.messages = [];
        this.errors.push(error.result.data.message);
      } finally {
        this.disabled = false;
      }
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
