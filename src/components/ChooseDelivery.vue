<template>
  <div class="delivery">
    <base-heading variant="h2">Choose delivery</base-heading>
    <base-select
      :options="deliveryOptions"
      @onSelectClick="selectDelivery"
    ></base-select>
    <h3 v-if="selectedDiveryOption.price">{{ price }}</h3>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import BaseHeading from "./UI/BaseHeading.vue";
import BaseSelect from "./UI/BaseSelect.vue";
import { computed } from "@vue/runtime-core";

const DELIVERY_OPTIONS = [
  {
    id: 1,
    name: "Pickup",
    type: "pickup",
    price: 0,
  },
  {
    id: 1,
    name: "Delivery",
    type: "delivery",
    price: 10,
  },
];

const emit = defineEmits(["onSelectDeliveryOption"]);
const deliveryOptions = DELIVERY_OPTIONS;
const selectedDiveryOption = reactive({});

const selectDelivery = (deliveryOption) => {
  selectedDiveryOption.price = deliveryOption.price;
  selectedDiveryOption.type = deliveryOption.type;
  selectedDiveryOption.id = deliveryOption.id;
  selectedDiveryOption.name = deliveryOption.name;
  emit("onSelectDeliveryOption", deliveryOption);
};

const price = computed(() =>
  selectedDiveryOption.price === 0
    ? "It's free"
    : "Price: $" + selectedDiveryOption.price
);
</script>

<style scoped>
.delivery {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
