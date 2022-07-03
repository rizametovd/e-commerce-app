<template>
  <div class="card">
    <base-card>
      <div class="card__container">
        <div class="card__image-container">
          <img :src="image" class="card__image" :alt="title" />

          <div class="card__like-btn">
            <base-icon-button
              @click="handleLikeClick"
              variant="contained"
              iconColor="lightgray"
              iconHoverColor="#ef2525"
              iconActiveColor="#ef2525"
              :isActive="isProductLiked"
              opacity="0.5"
            >
              <like-icon></like-icon>
            </base-icon-button>
          </div>
        </div>

        <h3 class="card__title">{{ title }}</h3>

        <div class="card__rating">
          <img src="../assets/star-icon.svg" />
          <p class="card__rating-text">{{ rating }}</p>
        </div>

        <h3 class="card__price">${{ price }}</h3>

        <form
          class="card__form"
          @submit.prevent="handleAddToCartClick"
          v-if="!isProductAlreadyInCart"
        >
          <quantity-block
            @decrement="decrementQuantity"
            @increment="incrementQuantity"
            :quantity="quantity"
          ></quantity-block>
          <base-icon-button
            variant="contained"
            type="submit"
            text="Add to cart"
            iconColor="lightgray"
            iconHoverColor="#ffa801"
          >
            <cart-icon></cart-icon>
          </base-icon-button>
        </form>

        <fade-transition>
          <base-button
            @click="openModal"
            variant="contained"
            mode="success"
            v-if="isProductAlreadyInCart"
            >Already is in your Cart</base-button
          >
        </fade-transition>
      </div>
    </base-card>
  </div>
</template>

<script>
import IconBase from "./UI/BaseIcon.vue";
import LikeIcon from "./icons/LikeIcon.vue";
import CartIcon from "./icons/CartIcon.vue";
import BaseCard from "./UI/BaseCard.vue";
import { mapActions, mapGetters } from "vuex";
import QuantityBlock from "./UI/QuantityBlock.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import BaseIconButton from "./UI/Buttons/BaseIconButton.vue";
import FadeTransition from "./UI/FadeTransition.vue";
export default {
  components: {
    IconBase,
    LikeIcon,
    BaseCard,
    CartIcon,
    QuantityBlock,
    BaseButton,
    BaseIconButton,
    FadeTransition,
  },

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
    ...mapActions(["setProductToCart", "openModal", "handleLikes"]),

    incrementQuantity() {
      this.quantity += 1;
    },

    decrementQuantity() {
      this.quantity -= 1;
    },

    handleLikeClick() {
      this.handleLikes(this.product);
    },

    handleAddToCartClick() {
      this.setProductToCart(this.product);
    },
  },

  computed: {
    ...mapGetters(["selectedProduct", "likedProduct"]),

    isProductAlreadyInCart() {
      return this.selectedProduct(this.id) !== undefined;
    },

    isProductLiked() {
      return this.likedProduct(this.id) !== undefined;
    },

    product() {
      return {
        id: this.id,
        title: this.title,
        price: this.price,
        image: this.image,
        quantity: this.quantity,
        rating: this.rating,
      };
    },
  },
};
</script>

<style scoped>
.card__container {
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: flex-start;
  min-height: 412px;
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
  position: absolute;
  top: 5px;
  right: 5px;
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

@media screen and (min-width: 768px) {
  .card:hover {
    box-shadow: 0px 21px 44px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }

  .card__title:hover {
    transition: color 0.1s linear;
    color: #ffa801;
  }
}
</style>
