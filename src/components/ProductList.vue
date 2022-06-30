<template>
  <div class="products-list">
    <loader v-if="products.length === 0"></loader>
  </div>
  <ul>
    <li v-for="product in products" :key="product.id">
      <card :image="product.image" :price="product.price" :title="product.title" :rating="product.rating.rate" :id="product.id"></card>
    </li>
  </ul>
</template>

<script>
import Card from './Card.vue';
import Loader from './UI/Loader.vue';
export default {
  components: { Card, Loader },
  props: {
    products: {
      type: Array,
      required: true,
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

@media screen and (min-width: 768px) {
  ul {
    display: grid;
    gap: 25px;
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
