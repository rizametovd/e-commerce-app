<template>
  <base-card class="product-page">
    <img
      :src="currentProduct.image"
      :alt="currentProduct.title"
      class="product-page__image"
    />
    <div class="product-page__content">
      <base-heading variant="h1" class="product-page__title"
        >{{ currentProduct.title }}
      </base-heading>

      <base-divider></base-divider>
      <div>
        <star-rating :rating="currentProduct.rating.rate"></star-rating>
      </div>
      <div class="product-page__actions">
        <base-heading variant="h2">${{ currentProduct.price }}</base-heading>
        <div class="product-page__actions-buy">
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
      <div class="product-page__description">
        <base-heading variant="h3">Description</base-heading>
        <p>
          {{ currentProduct.description }}
        </p>
      </div>
    </div>
  </base-card>
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
  },

  data() {
    return {
      quantity: 1,
    };
  },

  computed: {
    ...mapGetters(["product", "selectedProduct"]),

    currentProduct() {
      const product = this.product(+this.$route.params.id);
      return {
        ...product,
        quantity: this.quantity,
      };
    },

    isProductAlreadyInCart() {
      return this.selectedProduct(+this.$route.params.id) !== undefined;
    },
  },

  methods: {
    ...mapActions(["setProductToCart", "openModal"]),

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
  display: grid;
  gap: 20px;
}

.product-page__title {
  font-size: 28px;
  line-height: 34px;
}

.product-page__image {
  display: block;
  width: 100%;
}

.product-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.product-page__actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.product-page__actions-buy {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.product-page__description {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
}

@media screen and (min-width: 768px) {
  .product-page {
    padding-top: 30px;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .product-page__content {
    align-items: flex-start;
  }

  .product-page__title {
    font-size: 36px;
    line-height: 40px;
  }

  .product-page__actions {
    align-items: flex-start;
  }

  .product-page__actions-buy {
    flex-direction: row;
  }
}

@media screen and (min-width: 1024px) {
  .product-page__image {
    max-width: 600px;
    max-height: 600px;
    object-fit: contain;
  }
}
</style>
