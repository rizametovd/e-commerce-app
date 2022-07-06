<template>
  <div class="checkout">
    <h1 class="checkout__heading">Checkout</h1>
    <div v-if="cart.length > 0">
      <base-card :isFullWidth="false">
        <cart :products="cart"></cart>
      </base-card>
    </div>
    <h2 v-else class="checkout__heading_secondary">Cart is empty. Nothing to render</h2>

    <div class="checkout__location">
      <h3 class="checkout__subheading">Delivery location</h3>
      <div class="checkout__location-actions">

        <input v-model="location" placeholder="Enter your city and country" />
        <base-icon-button @click="getLocation" variant="outlined">
          <my-location-icon></my-location-icon>
        </base-icon-button>

      </div>
    </div>
    Здесь будет форма для контактных данных
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue';
import { mapActions, mapState } from 'vuex';
import BaseCard from '@/components/UI/BaseCard.vue';
import { getFromLocalStorage } from '@/utils/helpers';
import { getLocationData } from '@/utils/geoCoding';
import BaseIconButton from '@/components/UI/Buttons/BaseIconButton.vue';
import MyLocationIcon from '@/components/icons/MyLocationIcon.vue';
export default {
  components: { Cart, BaseCard, MyLocationIcon, BaseIconButton },
  computed: {
    ...mapState(['cart']),
  },

  data() {
    return {
      location: null,
    };
  },

  methods: {
    async getLocation() {
      try {
        const { countryName, city } = await getLocationData();
        this.location = `${city}, ${countryName}`;
      } catch (error) {
        console.log(error);
      }
    },
  },
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
  gap: 40px;
}

.checkout__heading {
  font-size: 40px;
  line-height: 42px;
}

.checkout__heading_secondary {
  font-size: 36px;
  line-height: 38px;
  color: lightgray;
}

.checkout__subheading {
  font-size: 24px;
}

.checkout__location {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkout__location-actions {
  align-self: center;
  display: flex;
  gap: 10px;
}
</style>
