<template>
  <FailedHttpRequest
    :errorCode="error.errorCode"
    :errorMessage="error.message"
    :timeout="error.timeout"
    :serverIsDown="serverStatus.isDown"
    :serverErrorMessage="serverStatus.message"
    v-if="error?.isError && !isLoading"
  />

  <div class="product-page" v-else>
    <loader v-if="isLoading"></loader>
    <base-card class="product-page__card" v-else>
      <img
        :src="currentProduct.image"
        :alt="currentProduct.title"
        class="product-page__card-image"
      />
      <div class="product-page__card-content">
        <BaseHeading variant="h1" class="product-page__card-title"
          >{{ currentProduct.title }}
        </BaseHeading>

        <base-divider></base-divider>
        <div class="product-page__card-rating">
          <star-rating :rating="currentProduct.rating.rate"></star-rating>

          <base-icon-button
            @click="handleLikeClick"
            variant="contained"
            :text="addToWishlistBtnText"
            iconColor="lightgray"
            iconHoverColor="#ef2525"
            iconActiveColor="#ef2525"
            :isActive="isProductLiked"
            opacity="0.5"
            :class="likeClass"
          >
            <like-icon></like-icon>
          </base-icon-button>
        </div>
        <div class="product-page__card-actions">
          <base-heading variant="h2">${{ currentProduct.price }}</base-heading>
          <div class="product-page__card-actions-buy">
            <quantity-block
              @decrement="decrementQuantity"
              @increment="incrementQuantity"
              :quantity="quantity"
            ></quantity-block>
            <base-button
              variant="contained"
              mode="success"
              @click="handleAddToCartClick"
              v-if="!isProductAlreadyInCart"
              >Add to cart</base-button
            >

            <base-button
              @click="openModal"
              variant="contained"
              mode="success"
              v-else
              >Already is in your Cart</base-button
            >
          </div>
        </div>
        <div class="product-page__card-description">
          <base-heading variant="h3">Description</base-heading>
          <p>
            {{ currentProduct.description }}
          </p>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import BaseHeading from "@/components/UI/BaseHeading.vue";
import QuantityBlock from "@/components/UI/QuantityBlock.vue";
import BaseButton from "@/components/UI/Buttons/BaseButton.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import { useStore } from "vuex";
import BaseDivider from "@/components/UI/BaseDivider.vue";
import FadeTransition from "@/components/UI/FadeTransition.vue";
import StarRating from "@/components/StarRating.vue";
import BaseIcon from "@/components/UI/BaseIcon.vue";
import Loader from "@/components/UI/Loader.vue";
import BaseIconButton from "@/components/UI/Buttons/BaseIconButton.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";
import FailedHttpRequest from "@/components/FailedHttpRequest.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const quantity = ref(1);

const currentProduct = computed(() => {
  const product = store.getters.product(route.params.id);
  console.log('product:', product)
  return {
    ...product,
    quantity: quantity.value,
  };
});


console.log('currentProduct:', currentProduct.value)

const isProductLiked = computed(() => store.getters.likedProduct(currentProduct.value.id) !== undefined);

const addToWishlistBtnText = computed(() =>
  isProductLiked.value ? "In your wishlist" : "Add to wishlist"
);

const isProductAlreadyInCart = computed(
  () => store.getters.selectedProduct(route.params.id) !== undefined
);


const isLoading = computed(() => store.getters.isLoading)
const error = computed(() => store.getters.error)
const serverStatus = computed(() => store.getters.serverStatus)



const likeClass = computed(() => [
  "product-page__card-like",
  isProductLiked.value && "product-page__card-like_active",
]);

const handleLikeClick = () => {
  store.dispatch("handleLikes", currentProduct.value);
};

const handleAddToCartClick = () => {
  store.dispatch("setProductToCart", currentProduct.value);
};

const incrementQuantity = () => {
  quantity.value += 1;
};

const decrementQuantity = () => {
  quantity.value -= 1;
};
</script>

<style scoped>
.product-page {
  position: relative;
}
.product-page__card {
  display: grid;
  gap: 20px;
}

.product-page__card-title {
  text-align: left;
  font-size: 28px;
  line-height: 34px;
}

.product-page__card-rating {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.product-page__card-like {
  display: flex;
  align-items: center;
}

.product-page__card-like_active {
  color: #ef2525;
}

.product-page__card-like:hover {
  color: #ef2525;
  fill: #ef2525;
}

.product-page__card-image {
  display: block;
  width: 100%;
}

.product-page__card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.product-page__card-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.product-page__card-actions-buy {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.product-page__card-description {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
}

@media screen and (min-width: 768px) {
  .product-page__card {
    padding: 30px;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .product-page__card-content {
    align-items: flex-start;
  }

  .product-page__card-title {
    font-size: 36px;
    line-height: 40px;
  }

  .product-page__card-actions {
    align-items: flex-start;
  }

  .product-page__card-actions-buy {
    flex-direction: row;
  }
}

@media screen and (min-width: 1024px) {
  .product-page__card-image {
    max-width: 600px;
    max-height: 600px;
    object-fit: contain;
  }
}
</style>
