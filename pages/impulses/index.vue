<template>
  <section class="container">
    <div class="content">
      <Logo />
      <h1 class="title">IMPULSES</h1>
      <ul class="impulses">
        <li
          v-for="(impulse, index) in impulses"
          :key="index"
          class="impulse"
        >
          <nuxt-link
            :to="{
              name: 'impulses-id',
              params: { id: impulse._id },
            }"
          >
            {{ impulse.name }}
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link class="button" to="/"> Homepage </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const res = await $axios.$get('/api/impulses');
    return { impulses: res.data.impulses };
  },
  head() {
    return {
      title: 'Impulses',
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  margin: 30px 0;
}
.impulses {
  list-style: none;
  margin: 0;
  padding: 0;
}
.impulse {
  margin: 10px 0;
}
.button {
  display: inline-block;
  margin-top: 50px;
}
</style>
