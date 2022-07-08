<template>
  <div class="checkout">
    <h1 class="checkout__heading">Checkout</h1>

    <base-placeholder v-if="cart.length === 0"></base-placeholder>

    <div class="checkout__content" v-if="cart.length > 0">
      <base-card>
        <cart :products="cart" :delivery="delivery"></cart>
      </base-card>

      <base-card class="checkout__content">
        <choose-delivery
          @onSelectDeliveryOption="setDeliveryOption"
        ></choose-delivery>

        <delivery-location
          v-if="delivery?.type === 'delivery'"
          :location="location"
          @onConfirmLocationClick="confirmLocation"
        ></delivery-location>

      </base-card>

      <checkout-form 
      :delivery="delivery"
      :location="confirmedLocation"
      ></checkout-form>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import { mapActions, mapState } from "vuex";
import BaseCard from "@/components/UI/BaseCard.vue";
// import { getFromLocalStorage } from "@/utils/helpers";
import { getLocationData } from "@/utils/geoCoding";
import BaseIconButton from "@/components/UI/Buttons/BaseIconButton.vue";
import MyLocationIcon from "@/components/icons/MyLocationIcon.vue";
import BaseSelect from "@/components/UI/BaseSelect.vue";
import BasePlaceholder from "@/components/UI/BasePlaceholder.vue";
import ChooseDelivery from "@/components/ChooseDelivery.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import DeliveryLocation from "@/components/DeliveryLocation.vue";

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
  },
  computed: {
    ...mapState(["cart"]),
  },

  data() {
    return {
      location: null,
      delivery: null,
      confirmedLocation: null,
    };
  },

  methods: {
    async setDeliveryOption(deliveryOption) {
      if (deliveryOption.type === "delivery") {
        this.location = ''; 
        await this.getLocation();
      }
      this.delivery = deliveryOption;
    },

    async getLocation() {
      try {

        const { countryName, city } = await getLocationData();
        
        this.location = `${city}, ${countryName}`;
      } catch (error) {
        console.log(error);
      }
    },

    confirmLocation(isConfirmed) {
      if (!isConfirmed) {
        this.confirmedLocation = '' ;
        return;
      }
       this.confirmedLocation = this.location;
    }
  },

  watch: {
    delivery() {
      this.confirmedLocation = null 
    }
  }
  // methods: {
  //   ...mapActions(["setDataFromLocalStorage"]),
  // },

  // mounted() {
  //   const localStorageCart = getFromLocalStorage("cart");
  //   const localStorageLikes = getFromLocalStorage("likes");

  //   if (localStorageCart) {
  //     this.setDataFromLocalStorage({
  //       mutation: "setProductToCart",
  //       products: localStorageCart,
  //     });
  //   }

  //   if (localStorageLikes) {
  //     this.setDataFromLocalStorage({
  //       mutation: "setLike",
  //       products: localStorageLikes,
  //     });
  //   }
  // },
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

.checkout__heading {
  font-size: 40px;
  line-height: 42px;
}

/* .checkout__subheading {
  font-size: 24px;
} */

/* .checkout__location {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkout__location-actions {
  align-self: center;
  display: flex;
  gap: 10px;
} */
</style>
