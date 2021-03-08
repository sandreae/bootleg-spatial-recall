<template>
  <Page :content="about" />
</template>
<script>
export default {
  async asyncData({ $content }) {
    const about = await $content('about').fetch();
    return {
      about,
    };
  },
  data() {
    return {
      about: [],
    };
  },
};
</script>
