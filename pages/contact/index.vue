<template>
  <Page :content="contact" />
</template>
<script>
export default {
  async asyncData({ $content }) {
    const contact = await $content('contact').fetch();
    return {
      contact,
    };
  },
  data() {
    return {
      contact: [],
    };
  },
};
</script>
