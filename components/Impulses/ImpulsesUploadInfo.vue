<template>
  <div class="info--flex-column"><h2>How to</h2></div>
</template>
<style scoped>
.info--flex-column {
  z-index: 1;
  align-items: flexcente;
  padding: 20px;
}

@media only screen and (min-width: 800px) {
  .info--flex-column {
    flex: 1 1 300px;
    max-width: 40vw;
    max-height: 40vh;
  }
}
</style>
