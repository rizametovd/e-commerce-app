<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s linear;
}

.fade-enter-to {
  opacity: 1;
}
</style>
