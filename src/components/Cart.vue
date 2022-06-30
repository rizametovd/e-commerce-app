<template>
  <section class="cart">
    <ul class="cart__list">
      <li class="cart__item" v-for="product in products" :key="product.id">
        <img :src="product.image" class="cart__img" />
        <h6>{{ product.title }}</h6>
        <quantity-block :quantity="product.quantity" @increment="incrementQuantity(product.id)" @decrement="decrementQuantity(product.id)"></quantity-block>
        <p>${{ product.price }}</p>
        <p>${{ product.price * product.quantity }}</p>

        <base-button @click="deleteProduct(product.id)" mode="icon">
          <icon-base>
            <deleteIcon></deleteIcon>
          </icon-base>
        </base-button>
      </li>
    </ul>

    <div class="cart__actions">
      <!-- <button @click="$emit('closeModal')">Continue shopping</button> -->
      <!-- <button @click="closeModal">Checkout</button> -->
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import DeleteIcon from './icons/DeleteIcon.vue';
import BaseButton from './UI/BaseButton.vue';
import IconBase from './UI/IconBase.vue';
import QuantityBlock from './UI/QuantityBlock.vue';
export default {
  emits: ['closeModal'],
  components: { QuantityBlock, BaseButton, IconBase, DeleteIcon },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  methods: {
    ...mapActions(['incrementQuantity', 'decrementQuantity', 'deleteProduct']),
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
}

.cart__list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
}
.cart__item {
  display: grid;
  grid-template-columns: 60px 4fr 1fr 50px 50px auto;
  gap: 15px;
  align-items: center;
}

.cart__img {
  width: 100%;
  height: 40px;
  object-fit: contain;
}

.cart__actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
</style>
