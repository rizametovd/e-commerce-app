<template>
  <div class="checkout">
    <base-heading variant="h1">Checkout</base-heading>
    <base-placeholder v-if="cart.length === 0"></base-placeholder>

    <div class="checkout__content" v-if="cart.length > 0">
      <base-card>
        <cart :products="cart" :delivery="delivery"></cart>
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
        :cart="cart"
        v-if="delivery"
      ></checkout-form>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import { mapState } from "vuex";
import BaseCard from "@/components/UI/BaseCard.vue";
import { getLocationData } from "@/utils/geoCoding";
import BaseIconButton from "@/components/UI/Buttons/BaseIconButton.vue";
import MyLocationIcon from "@/components/icons/MyLocationIcon.vue";
import BaseSelect from "@/components/UI/BaseSelect.vue";
import BasePlaceholder from "@/components/UI/BasePlaceholder.vue";
import ChooseDelivery from "@/components/ChooseDelivery.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import DeliveryLocation from "@/components/DeliveryLocation.vue";
import CheckoutSuccessPage from "./CheckoutSuccessPage.vue";
import BaseHeading from "@/components/UI/BaseHeading.vue";
import FadeTransition from "@/components/UI/FadeTransition.vue";

export default {
  components: {
    Cart,
    BaseCard,
    MyLocationIcon,
    BaseIconButton,
    BaseSelect,
    ChooseDelivery,
    CheckoutForm,
    BaseInput,
    DeliveryLocation,
    BasePlaceholder,
    CheckoutSuccessPage,
    BaseHeading,
    FadeTransition,
  },
  computed: {
    ...mapState(["cart"]),
  },

  data() {
    return {
      location: null,
      delivery: null,
      confirmedLocation: null,
      isGeoApiLocationAllowed: false,
    };
  },

  methods: {
    async setDeliveryOption(deliveryOption) {
      this.delivery = deliveryOption;
      if (deliveryOption.type === "delivery") {
        this.location = "";
        await this.getLocation();
      }
    },

    async getLocation() {
      try {
        const { countryName, city } = await getLocationData();

        this.isGeoApiLocationAllowed = true;
        this.location = `${city}, ${countryName}`;
      } catch (error) {
        console.log(error);
      }
    },

    confirmLocation(isConfirmed) {
      if (!isConfirmed) {
        this.confirmedLocation = "";
        return;
      }
      this.confirmedLocation = this.location;
    },
  },

  watch: {
    delivery() {
      this.confirmedLocation = null;
    },
  },
};
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
