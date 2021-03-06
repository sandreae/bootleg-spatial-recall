<template>
  <div>
    <Header />
    <Nav />
    <div class="container--flex-column">
      <Nuxt keep-alive />
    </div>
  </div>
</template>

<style>
.container--flex-column {
  padding-top: 30px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  align-items: center;
  background-color: chocolate;
}

@media only screen and (min-width: 800px) {
  .container--flex-column {
    align-items: stretch;
    justify-content: space-around;
  }
}
</style>
