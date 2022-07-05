<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      required: false,
      default: 0.3,
    },
  },
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity v-bind(duration + "s") ease;
}

.fade-enter-to {
  opacity: 1;
}
</style>
