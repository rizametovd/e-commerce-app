<template>
  <div class="timer">
    <svg
      class="timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="timer__circle">
        <circle class="timer__path" cx="50" cy="50" r="45" />

        <path
          :stroke-dasharray="circleDasharray"
          :class="remainingPathColor"
          class="timer__remaining-time"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>

    <span class="timer__label">{{ timer }}</span>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
const FULL_DASH_ARRAY = 283;
const TIMER_COLOR = {
  base: {
    color: "orange",
  },
  alert: {
    color: "red",
    threshold: 2,
  },
};

const emit = defineEmits(["onTimerEnd"]);
const props = defineProps({
  timeout: {
    type: Number,
    required: true,
  },
});

const timer = ref(null);

const countDown = (sec) => {
  timer.value = sec;
  let interval = setInterval(() => {
    timer.value--;

    if (timer.value === 0) {
      emit("onTimerEnd");
      clearInterval(interval);
      return;
    }
  }, 1000);
};

const circleDasharray = computed(
  () => `${(timeFraction.value * FULL_DASH_ARRAY).toFixed(0)} 283`
);

const timeFraction = computed(() => {
  const rawTimeFraction = timer.value / props.timeout;
  return rawTimeFraction - (1 / props.timeout) * (1 - rawTimeFraction);
});

const remainingPathColor = computed(() => {
  const { base, alert } = TIMER_COLOR;

  if (timer.value <= alert.threshold) return alert.color;
  return base.color;
});

watch(
  () => props.timeout,
  () => {
    countDown(props.timeout);
  },
  { immediate: true }
);
</script>

<style scoped>
.timer {
  position: relative;
  width: 50px;
  height: 50px;
}

.timer__svg {
  transform: scaleX(-1);
}

.timer__circle {
  fill: none;
  stroke: none;
}

.timer__path {
  stroke-width: 10px;
  stroke: lightgray;
}

.timer__remaining-time {
  stroke-width: 10px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.timer__remaining-time.orange {
  color: orange;
}

.timer__remaining-time.red {
  color: red;
}

.timer__label {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>
