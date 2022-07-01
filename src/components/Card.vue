<template>
  <div class="card">
    <base-card>
      <div class="card__container">
        <div class="card__image-container">
          <img :src="image" class="card__image" />
          <button class="card__like-btn">
            <!-- <button class="card__like-btn card__like-btn_active"> -->
            <icon-base>
              <like-icon></like-icon>
            </icon-base>
          </button>
        </div>

        <h3 class="card__title">{{ title }}</h3>

        <div class="card__rating">
          <img src="../assets/star-icon.svg" />
          <p class="card__rating-text">{{ rating }}</p>
        </div>

        <h3 class="card__price">${{ price }}</h3>

        <form class="card__form" @submit.prevent="handleAddToCartClick" v-if="!isProductAlreadyInCart">
          <quantity-block @decrement="decrementQuantity" @increment="incrementQuantity" :quantity="quantity"></quantity-block>

          <button class="card__form-submit-btn">
            <span class="card__form-submit-btn-text" type="submit">Add to Cart</span>
            <icon-base :width="14" :height="14">
              <cart-icon></cart-icon>
            </icon-base>
          </button>
        </form>
        <transition>
          <base-button @click="openModal" mode="success" v-if="isProductAlreadyInCart">Already is in your Cart</base-button>
        </transition>
      </div>
    </base-card>
  </div>
</template>

<script>
import IconBase from './UI/IconBase.vue';
import LikeIcon from './icons/LikeIcon.vue';
import CartIcon from './icons/CartIcon.vue';
import BaseCard from './UI/BaseCard.vue';
import { mapActions, mapGetters } from 'vuex';
import QuantityBlock from './UI/QuantityBlock.vue';
import BaseButton from './UI/BaseButton.vue';
export default {
  components: { IconBase, LikeIcon, BaseCard, CartIcon, QuantityBlock, BaseButton },

  props: {
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      quantity: 1,
    };
  },

  methods: {
    ...mapActions(['setProductsToCart', 'openModal']),

    console() {
      console.log('x:');
    },

    incrementQuantity() {
      this.quantity += 1;
    },

    decrementQuantity() {
      this.quantity -= 1;
    },

    handleAddToCartClick() {
      const data = {
        id: this.id,
        title: this.title,
        price: this.price,
        image: this.image,
        quantity: this.quantity,
      };

      this.setProductsToCart(data);
    },
  },

  computed: {
    ...mapGetters(['isProductAlreadyInCart', 'product']),

    isProductAlreadyInCart() {
      return this.product(this.id) !== undefined;
    },
  },
};
</script>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.5s linear;
}

.v-enter-to {
  opacity: 1;
}

.card__container {
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: flex-start;
}
.card__image-container {
  align-self: center;
  position: relative;
  width: 270px;
}

.card__image {
  display: block;
  width: 100%;
  height: 235px;
  object-fit: contain;
}

.card__title {
  min-height: 43px;
}

.card__like-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  position: absolute;
  border-radius: 50%;
  border: 0.5px solid #eaeaea;
  background-color: white;
  top: 5px;
  right: 5px;
  padding: 0;
  cursor: pointer;
  fill: #e2e2e2;
}

.card__like-btn-icon {
  width: 24px;
  height: 24px;
}

.card__like-btn_active {
  fill: #ef2525;
}

.card__rating {
  display: flex;
  gap: 5px;
  align-items: baseline;
}

.card__rating-text {
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
}

.card__price {
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
}

.card__form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 47px;
}

.card__form-submit-btn {
  display: flex;
  gap: 8px;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #666666;
  fill: #e2e2e2;
}

.card__form-submit-btn-text {
  color: inherit;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
}

@media screen and (min-width: 768px) {
  .card:hover {
    box-shadow: 0px 21px 44px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }

  .card__title:hover {
    transition: color 0.1s linear;
    color: #ffa801;
  }

  .card__like-btn > svg:hover {
    transition: fill 0.2s linear;
    fill: #ef2525;
  }

  .card__form-btn:not(:disabled):hover {
    transition: background-color 0.15s linear;
    background-color: #e2e2e2;
  }

  .card__form-submit-btn:hover,
  svg:hover {
    transition: all 0.15s linear;
    color: #ffa801;
    fill: #ffa801;
  }
}
</style>
