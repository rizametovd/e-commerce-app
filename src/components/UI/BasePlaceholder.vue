<template>
  <base-heading variant="h2" class="placeholder">Cart is empty. Nothing to render</base-heading>
</template>

<script>
import BaseHeading from './BaseHeading.vue';
export default {
  components: { BaseHeading },
};
</script>

<style scoped>
.placeholder {
  color: lightgray;
}
</style>
