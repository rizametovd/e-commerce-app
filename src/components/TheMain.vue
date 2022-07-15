<template>
  <main class="main">
    <teleport to="body">
      <base-modal
        :isModalOpen="store.getters.isCartModalOpen"
        type="cart"
        title="Your cart"
      >
        <cart
          :products="store.getters.cart"
          v-if="isCartNotEmpty"
          @onClick="store.dispatch('closeModal', 'cart')"
        ></cart>
        <p v-else>Your cart is empty</p>
        <template #actions>
          <router-link to="/checkout" v-if="isCartNotEmpty">
            <base-button
              variant="contained"
              mode="success"
              @click="store.dispatch('closeModal', 'cart')"
              >Checkout</base-button
            >
          </router-link>
        </template>
      </base-modal>
    </teleport>

    <teleport to="body">
      <base-modal
        :isModalOpen="store.getters.isLikesModalOpen"
        type="likes"
        title="Your likes"
      >
        <likes
          :likedProducts="store.getters.likes"
          v-if="store.getters.likes.length > 0"
          @onClick="store.dispatch('closeModal', 'likes')"
        ></likes>
        <p v-else>No likes yet</p>
      </base-modal>
    </teleport>

    <router-view v-slot="{ Component }">
      <fade-transition>
        <component :is="Component" />
      </fade-transition>
    </router-view>
  </main>
</template>

<script setup>
import { getFromLocalStorage, setToLocalStorage } from "@/utils/helpers";
import { useStore } from "vuex";
import BaseModal from "./UI/BaseModal.vue";
import Cart from "./Cart.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import Likes from "./Likes.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import { computed, onMounted, watch } from "@vue/runtime-core";

const store = useStore();

const isCartEmpty = computed(() => store.getters.cart.length === 0);
const isNoLikes = computed(() => store.getters.likes.length === 0);
const isNoProducts = computed(() => store.getters.products.length === 0);
const isCartNotEmpty = computed(() => store.getters.cart.length > 0);

watch(
  () => store.getters.cart,
  () => {
    setToLocalStorage("cart", store.getters.cart);
  },
  { deep: true }
);

watch(
  () => store.getters.likes,
  () => {
    setToLocalStorage("likes", store.getters.likes);
  },
  { deep: true }
);

onMounted(() => {
  const localStorageCart = getFromLocalStorage("cart");
  const localStorageLikes = getFromLocalStorage("likes");

  if (localStorageCart && isCartEmpty) {
    store.dispatch("setDataFromLocalStorage", {
      mutation: "setProductToCart",
      products: localStorageCart,
    });
  }

  if (localStorageLikes && isNoLikes) {
    store.dispatch("setDataFromLocalStorage", {
      mutation: "setLike",
      products: localStorageLikes,
    });
  }

  if (isNoProducts) {
    store.dispatch("fetchProducts");
  }
});

// export default {
//   components: { BaseModal, Cart, BaseButton, Likes, FadeTransition },
//   computed: {
//     ...mapState([
//       "cart",
//       "likes",
//       "products",
//       "isLikesModalOpen",
//       "isCartModalOpen",
//     ]),
//     isCartEmpty() {
//       return this.cart.length === 0;
//     },

//     isNoLikes() {
//       return this.likes.length === 0;
//     },

//     isNoProducts() {
//       return this.products.length === 0;
//     },

//     isCartNotEmpty() {
//       return this.cart.length > 0;
//     },
//   },

//   methods: {
//     ...mapActions(["setDataFromLocalStorage", "fetchProducts", "closeModal"]),
//   },

//   watch: {
//     cart: {
//       deep: true,
//       handler() {
//         setToLocalStorage("cart", this.cart);
//       },
//     },
//     likes: {
//       deep: true,
//       handler() {
//         setToLocalStorage("likes", this.likes);
//       },
//     },
//   },

//   mounted() {
//     const localStorageCart = getFromLocalStorage("cart");
//     const localStorageLikes = getFromLocalStorage("likes");

//     if (localStorageCart && this.isCartEmpty) {
//       this.setDataFromLocalStorage({
//         mutation: "setProductToCart",
//         products: localStorageCart,
//       });
//     }

//     if (localStorageLikes && this.isNoLikes) {
//       this.setDataFromLocalStorage({
//         mutation: "setLike",
//         products: localStorageLikes,
//       });
//     }

//     if (this.isNoProducts) {
//       this.fetchProducts();
//     }
//   },
// };
</script>

<style scoped>
.main {
  padding: 20px 0 40px;
}
</style>
