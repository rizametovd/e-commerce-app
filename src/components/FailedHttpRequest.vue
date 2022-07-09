<template>
  <div class="failed-http-request">
    <fade-transition :duration="2">
      <base-heading variant="h2" v-if="serverIsDown">{{
        serverErrorMessage
      }}</base-heading>
    </fade-transition>

    <div class="failed-http-request__timer" v-if="!isFetching">
      <base-heading variant="h3">{{ errorMessage }}</base-heading>
      <count-down-timer
        :timeout="timeout"
        @onTimerEnd="onFetchRequest"
      ></count-down-timer>
      <span class="failed-http-request__status"
        >Error code: <strong>{{ errorCode }}</strong></span
      >
    </div>

    <div
      v-if="isFetching && !serverIsDown"
      class="failed-http-request__sending-request"
    >
      <base-heading variant="h3">Sending new request...</base-heading>
      <loader></loader>
    </div>
  </div>
</template>

<script>
import CountDownTimer from "./CountDownTimer.vue";
import BaseHeading from "./UI/BaseHeading.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import Loader from "./UI/Loader.vue";

export default {
  components: { CountDownTimer, Loader, FadeTransition, BaseHeading },
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
    errorCode: {
      type: Number,
      required: false,
    },
    timeout: {
      type: Number,
      required: true,
    },
    serverIsDown: {
      type: Boolean,
      required: true,
    },
    serverErrorMessage: {
      type: [null, String],
      required: true,
    },
  },

  data() {
    return {
      isFetching: false,
    };
  },

  methods: {
    onFetchRequest() {
      this.isFetching = true;
    },
  },

  watch: {
    timeout: {
      immediate: true,
      handler() {
        this.isFetching = false;
      },
    },
  },
};
</script>

<style scoped>
.failed-http-request {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
}

.failed-http-request__timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.failed-http-request__status {
  font-size: 20px;
  color: red;
}

.failed-http-request__sending-request {
  position: relative;
}
</style>
