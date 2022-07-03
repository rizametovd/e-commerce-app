<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
