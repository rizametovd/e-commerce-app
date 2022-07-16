<template>
  <main class="main">
    <teleport to="body">
      <BaseModal :isModalOpen="isCartModalOpen" type="cart" title="Your cart">
        <Cart v-if="isProductsInCart" @onClick="closeModal('cart')" />
        <p v-else>Your cart is empty</p>
        <template #actions>
          <router-link to="/checkout" v-if="isProductsInCart">
            <BaseButton
              variant="contained"
              mode="success"
              @click="closeModal('cart')"
              >Checkout</BaseButton
            >
          </router-link>
        </template>
      </BaseModal>
    </teleport>

    <teleport to="body">
      <BaseModal
        :isModalOpen="isLikesModalOpen"
        type="likes"
        title="Your likes"
      >
        <Likes v-if="isLikes" @onClick="closeModal('likes')" />
        <p v-else>No likes yet</p>
      </BaseModal>
    </teleport>

    <router-view v-slot="{ Component }">
      <FadeTransition>
        <component :is="Component" />
      </FadeTransition>
    </router-view>
  </main>
</template>

<script setup>
import { getFromLocalStorage, setToLocalStorage } from "@/utils/helpers";
import BaseModal from "./UI/BaseModal.vue";
import Cart from "./Cart.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import Likes from "./Likes.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useProductStore } from "@/store/useProductStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/useCartStore";
import { useLikeStore } from "@/store/useLikeStore";
import { useCommonStore } from "@/store/useCommonStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const likeStore = useLikeStore();
const commonStore = useCommonStore();

const { products, isProducts } = storeToRefs(productStore);
const { isCartModalOpen, isLikesModalOpen } = storeToRefs(commonStore);
const { isLikes, likes } = storeToRefs(likeStore);
const { isProductsInCart, cart } = storeToRefs(cartStore);

const closeModal = (modal) => {
  commonStore.closeModal(modal);
};

watch(
  () => cart.value,
  () => {
    setToLocalStorage("cart", cart.value);
  },
  { deep: true }
);

watch(
  () => likes.value,
  () => {
    setToLocalStorage("likes", likes.value);
  },
  { deep: true }
);

onMounted(() => {
  const localStorageCart = getFromLocalStorage("cart");
  const localStorageLikes = getFromLocalStorage("likes");

  if (localStorageCart && !isProductsInCart.value) {
    cartStore.setProductsFromLStoCart(localStorageCart);
  }

  if (localStorageLikes && !isLikes.value) {
    likeStore.setLikesFromLS(localStorageLikes);
  }

  if (!isProducts.value) {
    productStore.fetchProducts();
  }
});
</script>

<style scoped>
.main {
  padding: 20px 0 40px;
}
</style>
