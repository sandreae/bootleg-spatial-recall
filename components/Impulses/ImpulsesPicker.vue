<template>
  <div class="impulse-info-container--flex-column">
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
    <div>Impulse</div>
  </div>
</template>

<style scoped>
.impulse-info-container--flex-column {
  align-items: stretch;
  overflow: scroll;
}

.impulse-info-container--flex-column div:nth-child(1n) {
  flex: 1 0 50px;
  border: solid violet;
  margin: 2px;
  text-align: center;
}
</style>
