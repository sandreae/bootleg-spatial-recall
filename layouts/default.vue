<template>
  <div>
    <Header />
    <Nav />
    <div class="container--flex-column">
      <Nuxt />
    </div>
  </div>
</template>

<style>
.container--flex-column {
  width: 100vw;
  height: 100vh;
  align-items: center;
}

@media only screen and (min-width: 800px) {
  .container--flex-column {
    align-items: stretch;
  }
}
</style>
