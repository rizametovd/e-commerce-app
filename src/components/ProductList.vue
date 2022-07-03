<template>
  <div class="products-list">
    <loader v-if="products.length === 0"></loader>
  </div>
  <ul>
    <li v-for="product in productsToRender" :key="product.id">
      <card :image="product.image" :price="product.price" :title="product.title" :rating="product.rating.rate" :id="product.id"></card>
    </li>
  </ul>

  <div class="products-list__show-more" v-if="itemsCountToRender < products.length">
    <show-more :count="itemsCountToRender" :listLength="products.length" @onShowMoreClick="handleShowMore"></show-more>
  </div>
</template>

<script>
import Card from './Card.vue';
import Loader from './UI/Loader.vue';
import ShowMore from './ShowMore.vue';
import { PRODUCTS_LIMIT } from '@/utils/constants';

export default {
  components: { Card, Loader, ShowMore },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      itemsCountToRender: PRODUCTS_LIMIT,
    };
  },

  methods: {
    handleShowMore(count) {
      this.itemsCountToRender = count;
    },
  },

  computed: {
    productsToRender() {
      return this.products.slice(0, this.itemsCountToRender);
    },
  },

  watch: {
    products() {
      this.itemsCountToRender = PRODUCTS_LIMIT;
    },
  },
};
</script>

<style scoped>
.products-list {
  position: relative;
}

ul {
  display: grid;
  gap: 25px;
  list-style: none;
  padding: 40px 0;
}

.products-list__show-more {
  padding: 20px 0 40px;
}

@media screen and (min-width: 768px) {
  ul {
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    padding: 60px 0;
  }
}

@media screen and (min-width: 1024px) {
  ul {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1280px) {
  ul {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
