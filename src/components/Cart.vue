<template>
  <section class="cart">
    <div class="cart__mobile">
      <div class="cart__grid">
        <label class="cart__title">Photo</label>
        <label class="cart__title">Title</label>
        <label class="cart__title">Quantity</label>
        <label class="cart__title">Price</label>
        <label class="cart__title">Subtotal</label>
      </div>
    </div>

    <ul class="cart__list">
      <li class="cart__grid" v-for="product in products" :key="product.id">
        <img
          :src="product.image"
          class="cart__img"
          :alt="product.title"
          @click="onClick(product.id)"
        />
        <p
          class="cart__item-title cart__item-text"
          @click="onClick(product.id)"
        >
          {{ product.title }}
        </p>

        <div class="cart__mobile">
          <span>Quantity:</span>
          <quantity-block
            :quantity="product.quantity"
            @increment="incrementQuantity(product.id)"
            @decrement="decrementQuantity(product.id)"
          ></quantity-block>
        </div>

        <div class="cart__mobile">
          <span>Price:</span>
          <p class="cart__item-text">${{ product.price }}</p>
        </div>

        <div class="cart__mobile">
          <span>Subtotal:</span>
          <p class="cart__item-text">
            ${{ (product.price * product.quantity).toFixed(2) }}
          </p>
        </div>

        <div class="cart__mobile-action">
          <base-icon-button
            @click="deleteProduct(product.id)"
            variant="contained"
            iconHoverColor="#ef2525"
            iconColor="#74747474"
            opacity="1"
          >
            <delete-icon></delete-icon>
          </base-icon-button>
        </div>
      </li>
    </ul>

    <div class="cart__totals-block">
      <span class="cart__totals-block-title">Total quantity:</span>
      <p>{{ totalQuantity }} pcs</p>
    </div>
    <div class="cart__totals-block">
      <span class="cart__totals-block-title">Total amount: </span>
      <p>${{ totalAmount }}</p>
    </div>

    <div class="cart__totals-block" v-if="delivery">
      <span class="cart__totals-block-title">Delivery price:</span>
      <p>{{ !isFreeDelivery ? "$" : "" }}{{ deliveryPrice }}</p>
    </div>

    <div class="cart__totals-block" v-if="delivery">
      <span class="cart__totals-block-title">Total:</span>
      <p>${{ total }}</p>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import DeleteIcon from "./icons/DeleteIcon.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import BaseIconButton from "./UI/Buttons/BaseIconButton.vue";
import IconBase from "./UI/BaseIcon.vue";
import QuantityBlock from "./UI/QuantityBlock.vue";
export default {
  emits: ["onClick"],
  components: {
    QuantityBlock,
    BaseButton,
    IconBase,
    DeleteIcon,
    BaseIconButton,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    delivery: {
      type: Object,
      required: false,
      default: null,
    },
  },

  methods: {
    ...mapActions(["incrementQuantity", "decrementQuantity", "deleteProduct"]),

    onClick(id) {
      this.$router.push(`/product/${id}`);
      this.$emit("onClick", "cart");
    },
  },

  computed: {
    totalAmount() {
      return +this.products
        .reduce(
          (total, product) => (total += product.price * product.quantity),
          0
        )
        .toFixed(2);
    },

    totalQuantity() {
      return this.products.reduce(
        (total, product) => (total += product.quantity),
        0
      );
    },

    isFreeDelivery() {
      return this.delivery.price === 0;
    },

    deliveryPrice() {
      if (!this.delivery) return;
      return this.isFreeDelivery ? "Free" : this.delivery.price;
    },

    total() {
      return this.isFreeDelivery
        ? this.totalAmount
        : (this.deliveryPrice + this.totalAmount).toFixed(2);
    },
  },
};
</script>

<style scoped>
.cart {
  display: grid;
}

.cart__title {
  display: none;
}

.cart__grid {
  display: grid;
  gap: 15px;
  border-bottom: 1px solid lightgray;
}

.cart__mobile {
  display: flex;
  gap: 20px;
  align-items: center;
}

.cart__mobile-action {
  justify-self: start;
  padding: 0 0 10px;
}

.cart__mobile > span {
  font-weight: 600;
}

.cart__list {
  display: grid;
  gap: 20px;
  padding: 0;
  list-style: none;
}

.cart__img {
  display: none;
}

.cart__item-title {
  cursor: pointer;
  justify-self: start;
}

.cart__item-title:hover {
  transition: color 0.1s linear;
  color: #ed8939;
}

.cart__item-text {
  font-size: 14px;
}

.cart__totals-block {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  padding: 15px 0 0;
}

.cart__actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.cart__totals-block-title {
  display: block;
  font-weight: 600;
}

@media screen and (min-width: 768px) {
  .cart {
    display: block;
  }
  .cart__grid {
    max-width: 900px;
    margin: auto;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    color: #222;
    padding: 15px 0;
    border-bottom: 1px solid lightgray;
  }

  .cart__title {
    display: block;
    font-weight: 600;
  }

  .cart__img {
    cursor: pointer;
    display: block;
    width: 100%;
    height: 40px;
    object-fit: contain;
  }

  .cart__img:hover {
    opacity: 0.7;
    transition: opacity 0.2s linear;
  }

  .cart__mobile {
    display: contents;
  }

  .cart__mobile > span {
    display: none;
  }

  .cart__mobile-action {
    justify-self: center;
    padding: 0;
  }

  .cart__totals-block {
    padding: 15px 20px 0 0;
  }
}
</style>
