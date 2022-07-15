<template>
  <div class="quantity">
    <base-icon-button
      @click="emit('decrement')"
      :isDisabled="isButtonDisabled"
      variant="outlined"
    >
      <minus-icon></minus-icon>
    </base-icon-button>

    <span class="quantity__count">{{ quantity }}</span>

    <base-icon-button @click="emit('increment')" variant="outlined">
      <plus-icon></plus-icon>
    </base-icon-button>
  </div>
</template>

<script setup>
import PlusIcon from "../icons/PlusIcon.vue";
import MinusIcon from "../icons/MinusIcon.vue";
import BaseIconButton from "./Buttons/BaseIconButton.vue";
import { computed } from "@vue/runtime-core";

const emit = defineEmits(["increment", "decrement"]);
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const isButtonDisabled = computed(() => props.quantity <= 1);
</script>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity__count {
  width: 25px;
}
</style>
