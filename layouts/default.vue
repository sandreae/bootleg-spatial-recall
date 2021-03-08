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
}

.container--flex-column-centre div:nth-child(1) {
  flex: 0 1 20px;
  justify-self: flex-start;
}

.container--flex-column-centre div:nth-child(2) {
  flex: 1;
}
</style>
