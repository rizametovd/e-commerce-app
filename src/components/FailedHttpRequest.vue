<template>
  <div class="failed-http-request">
    <fade-transition :duration="2">
      <h2 v-if="serverIsDown">{{ serverErrorMessage }}</h2>
    </fade-transition>

    <div class="failed-http-request__timer" v-if="!isFetching">
      <h2>{{ errorMessage }}</h2>
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
      <h2>Sending new request...</h2>
      <loader></loader>
    </div>
  </div>
</template>

<script>
import CountDownTimer from "./CountDownTimer.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import Loader from "./UI/Loader.vue";

export default {
  components: { CountDownTimer, Loader, FadeTransition },
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
