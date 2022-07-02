<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<style scoped>
.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.3s linear;
}

.v-enter-to, .v-leave-from {
  opacity: 1;
}
</style>
