<template>
  <div class="quantity">
    <button class="quantity__btn" type="button" @click="$emit('decrement')" :disabled="isButtonDisabled">-</button>
    <span class="quantity__count">{{ quantity }}</span>
    <button class="quantity__btn" type="button" @click="$emit('increment')">+</button>
  </div>
</template>

<script>
export default {
  emits: ['increment', 'decrement'],
  props: {
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  computed: {
    isButtonDisabled() {
      return this.quantity <= 1;
    },
  },
};
</script>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity__btn {
  width: 26px;
  height: 26px;
  font-size: 20px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  cursor: pointer;
}

.quantity__btn:disabled {
  cursor: default;
}

.quantity__count {
  width: 20px;
}

@media screen and (min-width: 768px) {
  .quantity__btn:not(:disabled):hover {
    transition: background-color 0.15s linear;
    background-color: #e2e2e2;
  }

}
</style>
