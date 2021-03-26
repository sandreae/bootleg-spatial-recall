<template>
  <div class="header-container--flex-column">
    <div class="nav--flex-row">
      <NuxtLink class="nav-item" to="/">home</NuxtLink>
      <NuxtLink class="nav-item" to="/about">about</NuxtLink>
      <NuxtLink class="nav-item" to="/contact">contact</NuxtLink>
      <NuxtLink class="nav-item" to="/impulses/upload"
        >upload</NuxtLink
      >
      <NuxtLink
        v-if="this.$auth.loggedIn"
        class="nav-item"
        to="/impulses/edit"
        >edit</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.header-container--flex-column {
  align-items: center;
  justify-content: center;
  flex: 0 1 50px;
}
.nav--flex-row {
  flex: 0 1 auto;
}
.nav-item {
  padding: 0 4px 0 4px;
}
@media only screen and (min-width: 800px) {
  .header-container--flex-column {
    flex-direction: row;
    align-self: flex-start;
    width: 98vw;
  }
}
</style>
