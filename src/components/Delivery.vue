<template>
  <div class="delivery">
    <h2>Choose delivery</h2>
    <base-select :options="deliveryOptions" @onSelectClick="selectDelivery"></base-select>
    <h3 v-if="selectedDiveryOption">{{ price }}</h3>
  </div>
</template>

<script>
import BaseSelect from './UI/BaseSelect.vue';

const DELIVERY_OPTIONS = [
  {
    id: 1,
    type: 'Pickup',
    price: 0,
  },
  {
    id: 1,
    type: 'Delivery',
    price: 10,
  },
];

export default {
  components: { BaseSelect },
  data() {
    return {
      deliveryOptions: DELIVERY_OPTIONS,
      selectedDiveryOption: null,
    };
  },

  methods: {
    selectDelivery(deliveryOption) {
      this.selectedDiveryOption = deliveryOption;
      this.$emit('onSelectDeliveryOption', deliveryOption);
    },
  },

  computed: {
    price() {
      return this.selectedDiveryOption.price === 0 ? "It's free" : 'Price: $' + this.selectedDiveryOption.price;
    },
  },
};
</script>

<style scoped>
.delivery {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
