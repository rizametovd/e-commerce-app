<template>
  <main class="main">
    <teleport to="body">
      <base-modal :isModalOpen="isCartModalOpen" type="cart" title="Your cart">
        <cart :products="cart" v-if="isCartNotEmpty"></cart>
        <p v-else>Your cart is empty</p>
        <template #actions>
          <router-link to="/checkout" v-if="isCartNotEmpty">
            <base-button
              variant="contained"
              mode="success"
              @click="closeModal('cart')"
              >Checkout</base-button
            >
          </router-link>
        </template>
      </base-modal>
    </teleport>

    <teleport to="body">
      <base-modal
        :isModalOpen="isLikesModalOpen"
        type="likes"
        title="Your likes"
      >
        <likes 
        :likedProducts="likes"
         v-if="likes.length > 0"
         @onTitleClick="goToProductPage"
         ></likes>
        <p v-else>No likes yet</p>
      </base-modal>
    </teleport>

    <router-view></router-view>
  </main>
</template>

<script>
import { getFromLocalStorage, setToLocalStorage } from "@/utils/helpers";
import { mapActions, mapState } from "vuex";
import BaseModal from "./UI/BaseModal.vue";
import Cart from "./Cart.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import Likes from "./Likes.vue";
import FadeTransition from "./UI/FadeTransition.vue";
export default {
  components: { BaseModal, Cart, BaseButton, Likes, FadeTransition },
  computed: {
    ...mapState([
      "cart",
      "likes",
      "products",
      "isLikesModalOpen",
      "isCartModalOpen",
    ]),
    isCartEmpty() {
      return this.cart.length === 0;
    },

    isNoLikes() {
      return this.likes.length === 0;
    },

    isNoProducts() {
      return this.products.length === 0;
    },

    isCartNotEmpty() {
      return this.cart.length > 0;
    },
  },

  methods: {
    ...mapActions(["setDataFromLocalStorage", "fetchProducts", "closeModal"]),

    goToProductPage(id) {
      this.$router.push(`/product/${id}`);
      this.closeModal('likes')
    }
  },

  watch: {
    cart: {
      deep: true,
      handler() {
        setToLocalStorage("cart", this.cart);
      },
    },
    likes: {
      deep: true,
      handler() {
        setToLocalStorage("likes", this.likes);
      },
    },
  },

  mounted() {
    const localStorageCart = getFromLocalStorage("cart");
    const localStorageLikes = getFromLocalStorage("likes");

    if (localStorageCart && this.isCartEmpty) {
      this.setDataFromLocalStorage({
        mutation: "setProductToCart",
        products: localStorageCart,
      });
    }

    if (localStorageLikes && this.isNoLikes) {
      this.setDataFromLocalStorage({
        mutation: "setLike",
        products: localStorageLikes,
      });
    }

    // if (this.$route.fullPath === "/" && this.isNoProducts) {
    //   this.fetchProducts();
    // }

        if (this.isNoProducts) {
      this.fetchProducts();
    }
  },
};
</script>

<style scoped>
.main {
  padding: 20px 0 40px;
}
</style>
