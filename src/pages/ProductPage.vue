<template>
  <div class="product-page">
    <loader v-if="isLoading"></loader>
    <base-card class="product-page__card" v-else>
      <img
        :src="currentProduct.image"
        :alt="currentProduct.title"
        class="product-page__card-image"
      />
      <div class="product-page__card-content">
        <base-heading variant="h1" class="product-page__card-title"
          >{{ currentProduct.title }}
        </base-heading>

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

<script>
import BaseHeading from "@/components/UI/BaseHeading.vue";
import QuantityBlock from "@/components/UI/QuantityBlock.vue";
import BaseButton from "@/components/UI/Buttons/BaseButton.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import BaseDivider from "@/components/UI/BaseDivider.vue";
import FadeTransition from "@/components/UI/FadeTransition.vue";
import StarRating from "@/components/StarRating.vue";
import BaseIcon from "@/components/UI/BaseIcon.vue";
import Loader from "@/components/UI/Loader.vue";
import BaseIconButton from "@/components/UI/Buttons/BaseIconButton.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";

export default {
  components: {
    BaseHeading,
    QuantityBlock,
    BaseButton,
    BaseCard,
    BaseDivider,
    FadeTransition,
    StarRating,
    BaseIcon,
    Loader,
    BaseIconButton,
    LikeIcon,
  },

  data() {
    return {
      quantity: 1,
    };
  },

  computed: {
    ...mapGetters(["product", "selectedProduct", "likedProduct"]),
    ...mapState(["isLoading"]),

    currentProduct() {
      const product = this.product(+this.$route.params.id);
      return {
        ...product,
        quantity: this.quantity,
      };
    },

    isProductLiked() {
      return this.likedProduct(this.currentProduct.id) !== undefined;
    },

    addToWishlistBtnText() {
      return this.isProductLiked ? "In your wishlist" : "Add to wishlist";
    },

    isProductAlreadyInCart() {
      return this.selectedProduct(+this.$route.params.id) !== undefined;
    },

    likeClass() {
      return [
        "product-page__card-like",
        this.isProductLiked && "product-page__card-like_active",
      ];
    },
  },

  methods: {
    ...mapActions(["setProductToCart", "openModal", "handleLikes"]),

    handleLikeClick() {
      this.handleLikes(this.currentProduct);
    },

    handleAddToCartClick() {
      this.setProductToCart(this.currentProduct);
    },

    incrementQuantity() {
      this.quantity += 1;
    },

    decrementQuantity() {
      this.quantity -= 1;
    },
  },
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
    padding-top: 30px;
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
