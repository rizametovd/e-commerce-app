<template>
  <base-card class="product-page">
    <img
      :src="currentProduct.image"
      :alt="currentProduct.title"
      class="product-page__image"
    />
    <div class="product-page__content">
      <base-heading variant="h1">{{ currentProduct.title }}</base-heading>

      <base-divider></base-divider>
      <div>
        <star-rating :rating="currentProduct.rating.rate"></star-rating>
      </div>
      <base-divider></base-divider>
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
      <base-divider></base-divider>
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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.product-page__image {
  display: block;
  width: 600px;
  height: 600px;
  object-fit: contain;
}

.product-page__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.product-page__actions {
  display: flex;
  gap: 40px;
  align-items: center;
}

.product-page__actions-buy {
  display: flex;
  gap: 20px;
  align-items: center;
}

.product-page__description {
  text-align: left;
}
</style>
