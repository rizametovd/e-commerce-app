<template>
  <section class="page-not-found">
    <base-heading variant="h1">Page not found</base-heading>
    <base-heading variant="h1" class="page-not-found__error">404</base-heading>

    <base-heading variant="h3" class="page-not-found__text"
      >You will be redirected to homepage in</base-heading
    >
    <count-down-timer
      :timeout="5"
      @onTimerEnd="redirectToHomepage"
    ></count-down-timer>
  </section>
</template>

<script setup>
import BaseHeading from "@/components/UI/BaseHeading.vue";
import CountDownTimer from "@/components/CountDownTimer.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToHomepage = () => {
  router.push("/");
};
</script>

<style scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.page-not-found__text {
  color: lightgray;
}

.page-not-found__error {
  color: #ef2525;
}
</style>