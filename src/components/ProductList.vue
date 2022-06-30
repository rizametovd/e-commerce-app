<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      <card :image="product.image" :price="product.price" :title="product.title" :rating="product.rating.rate" :id="product.id"></card>
    </li>
  </ul>
</template>

<script>
import Card from './Card.vue';
export default {
  components: { Card },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
