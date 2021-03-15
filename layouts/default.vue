<template>
  <div>
    <div
      class="container--flex-column-centre"
      :class="[`body-${$store.state.class.bodyClass}`]"
    >
      <Nav />
      <Nuxt keep-alive />
    </div>
  </div>
</template>

<style scoped>
.body-index {
  background-color: var(--main-bg-color) !important;
}

.body-about {
  background-color: var(--about-page-bg-color) !important;
}

.body-impulses-upload {
  background-color: var(--upload-page-bg-color) !important;
}

.container--flex-column-centre {
  background-color: var(--main-bg-color);
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
}

.container--flex-column-centre div:nth-child(2) {
  justify-self: stretch;
  flex: 1;
}
</style>
