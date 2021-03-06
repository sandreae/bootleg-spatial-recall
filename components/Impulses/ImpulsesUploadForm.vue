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
      control-type="audio-file"
      @fileChange="fileChange"
      >Audio</AppControlInput
    >
    <AppControlInput
      control-type="image-file"
      @fileChange="fileChange"
      >Image</AppControlInput
    >
    <AppButton type="submit">Save</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput';
import AppButton from '@/components/UI/AppButton';

export default {
  components: {
    AppControlInput,
    AppButton,
  },
  props: {
    impulse: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      editedImpulse: this.impulse
        ? { ...this.impulse }
        : {
            name: '',
            date: '',
            location: '',
            description: '',
            audioFile: {},
            imageFile: {},
          },
    };
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit('submit', this.editedImpulse);
    },
    fileChange(file) {
      // Save the post
      if (file.type.split('/')[0] === 'audio') {
        console.log('audio');
        this.editedImpulse.audioFile = file;
      } else {
        console.log('image');
        this.editedImpulse.imageFile = file;
      }
    },
  },
};
</script>
<style scoped>
.form--flex-column {
  flex: 1 1 auto;
  align-items: stretch;
  padding: 20px;
}
.form--flex-column :nth-child(1n) {
  z-index: 1;
}
</style>
