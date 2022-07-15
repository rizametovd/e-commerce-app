<template>
  <div class="checkout">
    <base-heading variant="h1">Checkout</base-heading>
    <base-placeholder v-if="store.getters.cart.length === 0"></base-placeholder>

    <div class="checkout__content" v-if="store.getters.cart.length > 0">
      <base-card>
        <cart :products="store.getters.cart" :delivery="delivery"></cart>
      </base-card>

      <base-card class="checkout__content">
        <choose-delivery
          @onSelectDeliveryOption="setDeliveryOption"
        ></choose-delivery>

        <fade-transition>
          <delivery-location
            v-if="isGeoApiLocationAllowed && delivery?.type === 'delivery'"
            :location="location"
            @onConfirmLocationClick="confirmLocation"
          ></delivery-location>
        </fade-transition>
      </base-card>

      <checkout-form
        :delivery="delivery"
        :location="confirmedLocation"
        :cart="store.getters.cart"
        v-if="delivery"
      ></checkout-form>
    </div>
  </div>
</template>

<script setup>
import Cart from "@/components/Cart.vue";
import { mapState, useStore } from "vuex";
import BaseCard from "@/components/UI/BaseCard.vue";
import { getLocationData } from "@/utils/geoCoding";
import BaseIconButton from "@/components/UI/Buttons/BaseIconButton.vue";
import BaseSelect from "@/components/UI/BaseSelect.vue";
import BasePlaceholder from "@/components/UI/BasePlaceholder.vue";
import ChooseDelivery from "@/components/ChooseDelivery.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import DeliveryLocation from "@/components/DeliveryLocation.vue";
import CheckoutSuccessPage from "./CheckoutSuccessPage.vue";
import BaseHeading from "@/components/UI/BaseHeading.vue";
import FadeTransition from "@/components/UI/FadeTransition.vue";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

const store = useStore();

const location = ref(null);
const delivery = reactive({});
const confirmedLocation = ref(null);
const isGeoApiLocationAllowed = ref(false);

const setDeliveryOption = async (deliveryOption) => {
  delivery.price = deliveryOption.price;
  delivery.type = deliveryOption.type;
  delivery.id = deliveryOption.id;
  delivery.name = deliveryOption.name;
  if (deliveryOption.type === "delivery") {
    location.value = "";
    await getLocation();
  }
};

const getLocation = async () => {
  try {
    const { countryName, city } = await getLocationData();

    isGeoApiLocationAllowed.value = true;
    location.value = `${city}, ${countryName}`;
  } catch (error) {
    console.log(error);
  }
};

const confirmLocation = async (isConfirmed) => {
  if (!isConfirmed) {
    confirmedLocation.value = "";
    return;
  }

  confirmedLocation.value = location.value;
};

watch(delivery, () => {
  confirmedLocation.value = null;
});
</script>

<style scoped>
.checkout {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 934px;
  gap: 40px;
}

.checkout__content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
