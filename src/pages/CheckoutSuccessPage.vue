<template>
  <div class="checkout-success">
    <base-heading variant="h1" class="checkout-success__title"
      >Success</base-heading
    >
    <base-heading variant="h3" class="checkout-success__subtitle"
      >You will be redirected to homepage in</base-heading
    >
    <count-down-timer
      :timeout="5"
      @onTimerEnd="redirectToHomepage"
    ></count-down-timer>
  </div>
</template>

<script>
import CountDownTimer from "@/components/CountDownTimer.vue";
import BaseHeading from "@/components/UI/BaseHeading.vue";
export default {
  components: { CountDownTimer, BaseHeading },

  methods: {
    redirectToHomepage() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.checkout-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.checkout-success__title {
  color: #5ec343;
}

.checkout-success__subtitle {
  color: lightgray;
}
</style>
