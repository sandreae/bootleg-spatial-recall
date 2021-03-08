<template>
  <div class="page-container--flex-column-centre">
    <div class="info-container--flex-column fuzzy">
      <ImpulsesUploadInfo :howto="howto" />
    </div>
    <div class="form-container--flex-column fuzzy">
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
  async asyncData({ $content }) {
    const howto = await $content('howto').fetch();

    return {
      howto,
    };
  },
  data: () => {
    return {
      errors: [],
    };
  },
  methods: {
    onSubmitted(postData) {
      this.checkForm(postData);
      if (this.errors.length > 0) {
        return;
      }
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
.page-container--flex-column-centre {
  justify-content: space-around;
  align-items: center;
}

.error {
  border: solid 2px red;
  z-index: 1;
  margin: 10px;
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
