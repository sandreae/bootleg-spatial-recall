<template>
  <form class="form--flex-column" @submit.prevent="onSave">
    <AppControlInput v-model="editedImpulse.name"
      >Name</AppControlInput
    >
    <AppControlInput v-model="editedImpulse.location"
      >Location</AppControlInput
    >
    <AppControlInput v-model="editedImpulse.date" control-type="date"
      >Date</AppControlInput
    >
    <AppControlInput
      v-model="editedImpulse.description"
      control-type="textarea"
      >Description</AppControlInput
    >
    <AppControlInput
      v-if="type !== 'edit'"
      control-type="audio-file"
      @fileChange="fileChange"
      >Audio</AppControlInput
    >
    <AppControlInput
      v-if="type !== 'edit'"
      control-type="image-file"
      @fileChange="fileChange"
      >Image</AppControlInput
    >

    <AppButton type="submit">Save</AppButton>
    <AppButton
      v-if="type === 'edit'"
      type="button"
      btn-style="cancel"
      @click="onDelete"
      >Delete</AppButton
    >
  </form>
</template>

<script>
export default {
  props: {
    impulse: {
      type: Object,
      default: () => null,
    },
    type: {
      type: String,
      required: false,
      default: () => 'upload',
    },
  },
  data() {
    return { errors: [] };
  },
  computed: {
    editedImpulse() {
      const baseImpulse = {
        name: '',
        date: '',
        location: '',
        description: '',
      };
      if (this.type === 'edit') {
        return this.impulse ? { ...this.impulse } : baseImpulse;
      }
      return {
        ...baseImpulse,
        audioFile: '',
        imageFile: '',
      };
    },
  },
  methods: {
    onSave() {
      this.checkForm();
      this.$emit('validation', this.errors);
      if (this.errors.length === 0) {
        this.$emit(
          'submit',
          this.editedImpulse,
          this.impulse ? this.impulse._id : null,
        );
      }
    },
    onDelete() {
      this.errors = [];
      if (!this.impulse || !this.impulse._id) {
        this.errors.push('Please select an impulse first.');
      }
      this.$emit('validation', this.errors);
      if (this.errors.length === 0) {
        this.$emit('delete', this.impulse._id);
      }
    },
    fileChange(file) {
      // Save the post
      if (file.type.split('/')[0] === 'audio') {
        this.editedImpulse.audioFile = file;
      } else {
        this.editedImpulse.imageFile = file;
      }
    },
    checkForm() {
      this.errors = [];

      if (this.type === 'edit') {
        if (!this.impulse || !this.impulse._id) {
          this.errors.push('Please select an impulse first.');
          return;
        }
      }
      if (!this.editedImpulse.name) {
        this.errors.push('Name required.');
      }
      if (this.editedImpulse.name.length < 4) {
        this.errors.push('Name must be longer than 4 characters.');
      }
      if (this.editedImpulse.name.length > 40) {
        this.errors.push(
          'Name must not be longer than 40 characters.',
        );
      }
      if (!this.editedImpulse.description) {
        this.errors.push('Please describe your impulse.');
      }
      if (!this.editedImpulse.date) {
        this.errors.push('Please provide a date.');
      }
      if (!this.editedImpulse.location) {
        this.errors.push('Please provide a location.');
      }
      if (this.type === 'upload') {
        if (!this.editedImpulse.imageFile.type) {
          this.errors.push('Please provide an image.');
        } else if (
          this.editedImpulse.imageFile.type.split('/')[0] !== 'image'
        ) {
          this.errors.push(
            'Please check your image file is an image.',
          );
        }
        if (!this.editedImpulse.audioFile.type) {
          this.errors.push('Please provide an audio file.');
        } else if (
          this.editedImpulse.audioFile.type.split('/')[0] !== 'audio'
        ) {
          this.errors.push('Please check your audio file is audio.');
        }
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
