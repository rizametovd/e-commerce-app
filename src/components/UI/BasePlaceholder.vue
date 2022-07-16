<template>
  <BaseHeading variant="h2" class="placeholder">{{ text }}</BaseHeading>
</template>

<script setup>
import BaseHeading from "./BaseHeading.vue";

const props = defineProps({
  text: String,
  required: true,
});
</script>

<style scoped>
.placeholder {
  color: lightgray;
}
</style>
