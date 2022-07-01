<template>
  <section class="cart">
    <div class="cart__grid">
      <label class="cart__title">Photo</label>
      <label class="cart__title">Title</label>
      <label class="cart__title">Quantity</label>
      <label class="cart__title">Price</label>
      <label class="cart__title">Subtotal</label>
    </div>

    <ul class="cart__list">
      <li class="cart__grid" v-for="product in products" :key="product.id">
        <img :src="product.image" class="cart__img" />
        <p class="cart__item-title cart__item-text">{{ product.title }}</p>
        <quantity-block :quantity="product.quantity" @increment="incrementQuantity(product.id)" @decrement="decrementQuantity(product.id)"></quantity-block>
        <p class="cart__item-text">${{ product.price }}</p>
        <!-- <p class="cart__item-text">${{ (product.price * product.quantity).toFixed(2) }}</p> -->
        <p class="cart__item-text">${{ subTotal }}</p>

        <base-button @click="deleteProduct(product.id)" mode="icon">
          <icon-base>
            <deleteIcon></deleteIcon>
          </icon-base>
        </base-button>
      </li>
      <p>Total quantity: {{totalQuantity}} pcs</p>
      <p>Total amount: ${{ totalAmount }}</p>
    </ul>

    <!-- <ul class="cart__list">
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
    </ul> -->

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

  computed: {
    subTotal() {
      return this.products.reduce((subtotal, product) => (subtotal = product.price * product.quantity), 0).toFixed(2);
    },
    totalAmount() {
      return this.products.reduce((total, product) => (total += product.price * product.quantity), 0).toFixed(2);
    },

    totalQuantity() {
      return this.products.reduce((total, product) => (total += product.quantity), 0);
    },
  },
};
</script>

<style scoped>
.cart__title {
  font-weight: 600;
}

.cart__grid {
  max-width: 900px;
  margin: auto;
  display: grid;
  align-items: center;
  justify-items: center;

  grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  color: #222;
  border-bottom: 1px solid #ddd;
  padding: 1em 0;
}

.cart__list {
  padding: 0;
  list-style: none;
}

.cart__img {
  width: 100%;
  height: 40px;
  object-fit: contain;
}

.cart__item-title {
  justify-self: start;
}

.cart__item-text {
  font-size: 14px;
}

.cart__actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
</style>
