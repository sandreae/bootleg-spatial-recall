<template>
  <section class="container">
    <div class="content">
      <Logo />
      <h1 class="title">User</h1>
      <h2 class="info">
        {{ impulse.name }}
      </h2>
      <img :src="impulse.imageUrl" />
      <nuxt-link class="button" to="/impulses"> Impulses </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  asyncData({ params, error, $axios }) {
    return $axios
      .$get('/api/impulses/' + params.id)
      .then((res) => {
        return { impulse: res.data.impulse };
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Impulse not found' });
      });
  },
  head() {
    return {
      title: `Impulse: ${this.impulse.name}`,
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
  margin-top: 30px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 30px;
}
</style>
