<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import { getFromLocalStorage, setToLocalStorage } from '@/utils/helpers';
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['cart', 'likes', 'products']),
    isCartEmpty() {
      return this.cart.length === 0;
    },

    isNoLikes() {
      return this.likes.length === 0;
    },

    isNoProducts() {
      return this.products.length === 0;
    },
  },

  methods: {
    ...mapActions(['setDataFromLocalStorage', 'fetchProducts']),
  },

  watch: {
    cart: {
      deep: true,
      handler() {
        setToLocalStorage('cart', this.cart);
      },
    },
    likes: {
      deep: true,
      handler() {
        setToLocalStorage('likes', this.likes);
      },
    },
  },

  mounted() {
    const localStorageCart = getFromLocalStorage('cart');
    const localStorageLikes = getFromLocalStorage('likes');

    if (localStorageCart && this.isCartEmpty) {
      this.setDataFromLocalStorage({
        mutation: 'setProductToCart',
        products: localStorageCart,
      });
    }

    if (localStorageLikes && this.isNoLikes) {
      this.setDataFromLocalStorage({
        mutation: 'setLike',
        products: localStorageLikes,
      });
    }

    if (this.$route.fullPath === '/' && this.isNoProducts) {
      this.fetchProducts();
    }
  },
};
</script>

<style scoped></style>
