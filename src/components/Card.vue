<template>
  <div class="card">
    <base-card :isFullWidth="true">
      <div class="card__container">
        <div class="card__image-container">
          <img
            :src="image"
            class="card__image"
            :alt="title"
            @click="router.push(`product/${id}`)"
          />

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

        <base-heading
          variant="h4"
          class="card__title"
          @click="router.push(`product/${id}`)"
          >{{ title }}</base-heading
        >

        <div class="card__rating">
          <img src="../assets/star-icon.svg" />
          <p class="card__rating-text">{{ rating.rate }}</p>
        </div>

        <h3 class="card__price">${{ price }}</h3>

        <div class="card__actions" v-if="!isProductAlreadyInCart">
          <quantity-block
            @decrement="decrementQuantity"
            @increment="incrementQuantity"
            :quantity="quantity"
          ></quantity-block>
          <base-icon-button
            variant="contained"
            text="Add to cart"
            iconColor="lightgray"
            iconHoverColor="#ffa801"
            @click="handleAddToCartClick"
          >
            <cart-icon></cart-icon>
          </base-icon-button>
        </div>

        <fade-transition>
          <base-button
            @click="store.dispatch('openModal', 'cartModal')"
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

<script setup>
import IconBase from "./UI/BaseIcon.vue";
import LikeIcon from "./icons/LikeIcon.vue";
import CartIcon from "./icons/CartIcon.vue";
import BaseCard from "./UI/BaseCard.vue";
import { mapActions, mapGetters, useStore } from "vuex";
import QuantityBlock from "./UI/QuantityBlock.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import BaseIconButton from "./UI/Buttons/BaseIconButton.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import BaseHeading from "./UI/BaseHeading.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const props = defineProps({
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
    type: [Object, Number],
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const store = useStore();
const router = useRouter();
let quantity = ref(1);

const product = computed(() => {
  return {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    quantity,
    rating: props.rating,
  };
});

const isProductAlreadyInCart = computed(
  () => store.getters.selectedProduct(props.id) !== undefined
);
const isProductLiked = computed(
  () => store.getters.likedProduct(props.id) !== undefined
);

const incrementQuantity = () => {
  quantity.value += 1;
};

const decrementQuantity = () => {
  quantity.value -= 1;
};

const handleLikeClick = () => {
  store.dispatch("handleLikes", product.value);
};

const handleAddToCartClick = () => {
  store.dispatch("setProductToCart", product.value);
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
  width: 266px;
}

.card__image {
  display: block;
  width: 100%;
  height: 235px;
  object-fit: contain;
  cursor: pointer;
}

.card__title {
  min-height: 43px;
  cursor: pointer;
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

.card__actions {
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
