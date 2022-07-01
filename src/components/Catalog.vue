<template>
  <base-modal :isModalOpen="isCartModalOpen" title="Your cart">
    <cart :products="cart" v-if="cart.length > 0"></cart>
    <p v-else>Your cart is empty</p>
    <template #actions>
      <base-button mode="primary">Continue shopping</base-button>
    </template>
  </base-modal>

  <div class="catalog">
    <base-heading variant="h2">Catalog</base-heading>
    <category-tabs :items="categories" @onCategoryClick="setActiveCategory" v-if="products.length > 0"></category-tabs>
  </div>
  <hr />
  <product-list :products="productList"></product-list>
</template>

<script>
import BaseHeading from './UI/BaseHeading.vue';
import CategoryTabs from './CategoryTabs.vue';
import BaseCard from './UI/BaseCard.vue';
import Card from './Card.vue';
import BaseList from './UI/BaseList.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import ProductList from './ProductList.vue';
import BaseModal from './UI/BaseModal.vue';
import Cart from './Cart.vue';
import BaseButton from './UI/BaseButton.vue';

export default {
  components: { BaseHeading, CategoryTabs, BaseCard, Card, BaseList, ProductList, BaseModal, Cart, BaseButton },

  data() {
    return {
      activeCategory: 'all',
    };
  },

  methods: {
    ...mapActions(['fetchProducts']),

    setActiveCategory(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },

  computed: {
    ...mapGetters(['categories']),
    ...mapState(['products', 'isCartModalOpen', 'cart']),

    productList() {
      if (this.activeCategory === 'all') return this.products;
      return this.products.filter((product) => product.category === this.activeCategory);
    },
  },

  mounted() {
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

/* ul {
  display: grid;
  gap: 25px;
  list-style: none;
  padding: 40px 0;
} */

/* @media screen and (min-width: 768px) {
  ul {
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(2, 1fr);
    padding: 60px 0;
  }
} */

@media screen and (min-width: 1024px) {
  .catalog {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  /* ul {
    grid-template-columns: repeat(3, 1fr);
  } */
}

/* @media screen and (min-width: 1280px) {
  ul {
    grid-template-columns: repeat(4, 1fr);
  }
} */
</style>
