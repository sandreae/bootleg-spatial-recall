<template>
  <div class="form-container--flex-column-centre">
    <div class="upload-info-container--flex-column fuzzy">
      <ImpulsesUploadInfo />
    </div>
    <div class="upload-form-container--flex-column fuzzy">
      <ImpulsesUploadForm @submit="onSubmitted" />
      <div v-if="errors.length" class="error">
        <b>Please correct the following error(s):</b>
        <div v-for="error in errors" :key="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      errors: [],
    };
  },
  methods: {
    onSubmitted(postData) {
      this.checkForm(postData);
      const formData = new FormData();
      Object.keys(postData).forEach((key) => {
        formData.append(key, postData[key]);
      });
      this.$axios
        .$post('/api/impulses', formData)
        .then((result) => console.log(result))
        .catch((e) => {
          this.errors.push(e.message);
        });
    },
    checkForm(postData) {
      this.errors = [];

      if (!postData.name) {
        this.errors.push('Name required.');
      }
      if (postData.name.length < 4) {
        this.errors.push('Name must be longer than 4 characters.');
      }
      if (postData.name.length > 40) {
        this.errors.push(
          'Name must not be longer than 40 characters.',
        );
      }
      if (!postData.description) {
        this.errors.push('Please describe your impulse.');
      }
      if (!postData.date) {
        this.errors.push('Please provide a date.');
      }
      if (!postData.location) {
        this.errors.push('Please provide a location.');
      }
      if (!postData.imageFile.type) {
        this.errors.push('Please provide an image.');
      } else if (postData.imageFile.type.split('/')[0] !== 'image') {
        this.errors.push('Please check your image file is an image.');
      }
      if (!postData.audioFile.type) {
        this.errors.push('Please provide an audio file.');
      } else if (postData.audioFile.type.split('/')[0] !== 'audio') {
        this.errors.push('Please check your audio file is audio.');
      }
    },
  },
};
</script>

<style scoped>
.form-container--flex-column-centre {
  justify-content: space-around;
  align-items: flex-start;
}

.upload-info-container--flex-column {
  flex: 1 1 auto;
}

.upload-form-container--flex-column {
  flex: 1 1 auto;
}
.error {
  border: solid 2px red;
  z-index: 1;
  margin: 10px;
}

@media only screen and (min-width: 800px) {
  .form-container--flex-column-centre {
    flex-flow: row-reverse;
    align-items: flex-start;
    max-height: 90vh;
    justify-content: fill;
  }
  .upload-info-container--flex-column {
    flex: 1 1 auto;
    max-width: 40vw;
  }
  .upload-form-container--flex-column {
    flex: 1 1 auto;
    max-width: 40vw;
  }
}
</style>
