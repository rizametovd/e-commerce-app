<template>
  <base-modal :isModalOpen="isCartModalOpen" type="cart" title="Your cart">
    <cart :products="cart" v-if="cart.length > 0"></cart>
    <p v-else>Your cart is empty</p>
    <template #actions>
      <base-button variant="outlined">Checkout (пока не работает)</base-button>
    </template>
  </base-modal>

  <base-modal :isModalOpen="isLikesModalOpen" type="likes" title="Your likes">
    <likes :likedProducts="likes" v-if="likes.length > 0"></likes>
    <p v-else>No likes yet</p>
  </base-modal>

  <div class="catalog">
    <base-heading variant="h2">Catalog</base-heading>
    <category-tabs
      :items="categories"
      @onCategoryClick="setActiveCategory"
      v-if="isTabsVisible"
    ></category-tabs>
  </div>

  <hr />
  <product-list :products="productList"></product-list>
</template>

<script>
import BaseHeading from "./UI/BaseHeading.vue";
import CategoryTabs from "./CategoryTabs.vue";
import BaseCard from "./UI/BaseCard.vue";
import Card from "./Card.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import ProductList from "./ProductList.vue";
import BaseModal from "./UI/BaseModal.vue";
import Cart from "./Cart.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import Likes from "./Likes.vue";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/helpers";

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
  },

  data() {
    return {
      activeCategory: "all",
    };
  },

  methods: {
    ...mapActions(["fetchProducts", "closeModal", "setDataFromLocalStorage"]),

    setActiveCategory(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },

  computed: {
    ...mapGetters(["categories"]),
    ...mapState([
      "products",
      "isCartModalOpen",
      "cart",
      "likes",
      "isLikesModalOpen",
    ]),

    productList() {
      if (this.activeCategory === "all") return this.products;
      return this.products.filter(
        (product) => product.category === this.activeCategory
      );
    },

    isTabsVisible() {
      return this.products.length > 0;
    },
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
    this.setDataFromLocalStorage({mutation:"setProductToCart", products:localStorageCart});
    this.setDataFromLocalStorage({mutation: "setLike", products: localStorageLikes});

    this.fetchProducts();
  },
};
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
}

hr {
  border: 0;
  border-top: 2px solid #f6f6f6;
}

@media screen and (min-width: 1024px) {
  .catalog {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
