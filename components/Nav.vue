<template>
  <div class="nav--flex-row">
    <NuxtLink class="nav-item" to="/">home</NuxtLink>
    <NuxtLink class="nav-item" to="/impulses/upload">upload</NuxtLink>
  </div>
</template>

<style scoped>
.nav--flex-row {
  position: fixed;
  top: 0px;
  right: 0px;
}
.nav-item {
  padding: 10px;
}
</style>
