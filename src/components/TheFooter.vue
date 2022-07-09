<template>
  <footer class="footer">
    <hr />
    <base-heading variant="h1" class="footer__title">The Footer</base-heading>
  </footer>
</template>

<script>
import BaseHeading from "./UI/BaseHeading.vue";
export default {
  components: { BaseHeading },
};
</script>

<style scoped>
.footer__title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgray;
  justify-self: center;
  align-self: center;
  height: 100%;
}

hr {
  border: 0;
  border-top: 2px solid #f6f6f6;
}
</style>
