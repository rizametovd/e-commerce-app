<template>
  <div class="delivery">
    <base-heading variant="h2">Choose delivery</base-heading>
    <base-select :options="deliveryOptions" @onSelectClick="selectDelivery"></base-select>
    <h3 v-if="selectedDiveryOption">{{ price }}</h3>
  </div>
</template>

<script>
import BaseHeading from './UI/BaseHeading.vue';
import BaseSelect from './UI/BaseSelect.vue';
import FadeTransition from './UI/FadeTransition.vue';

const DELIVERY_OPTIONS = [
  {
    id: 1,
    name: 'Pickup',
    type: 'pickup',
    price: 0,
  },
  {
    id: 1,
    name: 'Delivery',
    type: 'delivery',
    price: 10,
  },
];

export default {
  emits: ['onSelectDeliveryOption'],
  components: { BaseSelect, BaseHeading },
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
