<template>
  <!-- <base-modal :isModalOpen="isCartModalOpen" type="cart" title="Your cart">
    <cart :products="cart" v-if="isCartNotEmpty"></cart>
    <p v-else>Your cart is empty</p>
    <template #actions>
      <router-link to="/checkout" v-if="isCartNotEmpty">
        <base-button variant="contained" mode="success" @click="closeModal('cart')">Checkout</base-button>
      </router-link>
    </template>
  </base-modal>

  <base-modal :isModalOpen="isLikesModalOpen" type="likes" title="Your likes">
    <likes :likedProducts="likes" v-if="likes.length > 0"></likes>
    <p v-else>No likes yet</p>
  </base-modal> -->

  <div class="catalog">
    <div class="catalog__header">
      <div class="catalog__header-container">
        <base-heading variant="h2">Catalog</base-heading>
        <category-tabs :items="categories" @onCategoryClick="setActiveCategory" v-if="isTabsVisible"></category-tabs>
      </div>

      <hr />
    </div>

    <fade-transition>
      <failed-http-request
        :errorCode="error.errorCode"
        :errorMessage="error.message"
        :timeout="error.timeout"
        :serverIsDown="serverStatus.isDown"
        :serverErrorMessage="serverStatus.message"
        v-if="error?.isError && !isLoading"
      ></failed-http-request>
    </fade-transition>

    <div class="catalog__loader">
      <fade-transition>
        <loader v-if="isLoading"></loader>
      </fade-transition>
    </div>

    <product-list :products="productList"></product-list>
  </div>
</template>

<script>
import BaseHeading from './UI/BaseHeading.vue';
import CategoryTabs from './CategoryTabs.vue';
import BaseCard from './UI/BaseCard.vue';
import Card from './Card.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import ProductList from './ProductList.vue';
import BaseModal from './UI/BaseModal.vue';
import Cart from './Cart.vue';
import BaseButton from './UI/Buttons/BaseButton.vue';
import FailedHttpRequest from './FailedHttpRequest.vue';
import Likes from './Likes.vue';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/helpers';
import Loader from './UI/Loader.vue';
import FadeTransition from './UI/FadeTransition.vue';

export default {
  components: {
    BaseHeading,
    CategoryTabs,
    BaseCard,
    Card,
    ProductList,
    BaseModal,
    Cart,
    BaseButton,
    Likes,
    FailedHttpRequest,
    Loader,
    FadeTransition,
  },

  data() {
    return {
      activeCategory: 'all',
    };
  },

  methods: {
    ...mapActions(['fetchProducts', 'closeModal', 'setDataFromLocalStorage']),

    setActiveCategory(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },

  computed: {
    ...mapGetters(['categories']),
    ...mapState(['products', 'isCartModalOpen', 'cart', 'likes', 'isLikesModalOpen', 'error', 'isLoading', 'serverStatus']),

    productList() {
      if (this.activeCategory === 'all') return this.products;
      return this.products.filter((product) => product.category === this.activeCategory);
    },

    isTabsVisible() {
      return this.products.length > 0;
    },

    // isCartNotEmpty() {
    //   return this.cart.length > 0
    // }

    // isNoProducts() {
    //   return this.products.length === 0;
    // },

    // isCartEmpty() {
    //   return this.cart.length === 0;
    // },

    // isNoLikes() {
    //   return this.likes.length === 0;
    // },
  },

  // watch: {
  //   cart: {
  //     deep: true,
  //     handler() {
  //       setToLocalStorage('cart', this.cart);
  //     },
  //   },
  //   likes: {
  //     deep: true,
  //     handler() {
  //       setToLocalStorage('likes', this.likes);
  //     },
  //   },
  // },

  mounted() {
    // const localStorageCart = getFromLocalStorage('cart');
    // const localStorageLikes = getFromLocalStorage('likes');

    // if (localStorageCart && this.isCartEmpty) {
    //   this.setDataFromLocalStorage({
    //     mutation: 'setProductToCart',
    //     products: localStorageCart,
    //   });
    // }

    // if (localStorageLikes && this.isNoLikes) {
    //   this.setDataFromLocalStorage({
    //     mutation: 'setLike',
    //     products: localStorageLikes,
    //   });
    // }

    // if (this.$route.fullPath === '/' && this.isNoProducts) {
    //   this.fetchProducts();
    // }
  },
};
</script>

<style scoped>
.catalog {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
  /* padding: 20px 0; */
}

.catalog__header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
}

.catalog__header-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

hr {
  border: 0;
  width: 100%;
  border-top: 2px solid #f6f6f6;
  margin: 0;
}

.catalog__loader {
  position: relative;
}

@media screen and (min-width: 1024px) {
  .catalog__header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
