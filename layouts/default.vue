<template>
  <div>
    <div class="container--flex-column-centre">
      <Nav />
      <Nuxt keep-alive />
    </div>
  </div>
</template>

<style scoped>
.container--flex-column-centre {
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
}

.container--flex-column-centre div:nth-child(2) {
  justify-self: stretch;
  flex: 1;
}
</style>
