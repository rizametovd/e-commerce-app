<template>
  <div class="catalog">
    <div class="catalog__header">
      <div class="catalog__header-container">
        <base-heading variant="h2">Catalog</base-heading>
        <category-tabs
          :items="store.getters.categories"
          @onCategoryClick="setActiveCategory"
          v-if="isTabsVisible"
        ></category-tabs>
      </div>

      <hr />
    </div>

    <fade-transition>
      <failed-http-request
        :errorCode="store.getters.error.errorCode"
        :errorMessage="store.getters.error.message"
        :timeout="store.getters.error.timeout"
        :serverIsDown="store.getters.serverStatus.isDown"
        :serverErrorMessage="store.getters.serverStatus.message"
        v-if="store.getters.error?.isError && !store.getters.isLoading"
      ></failed-http-request>
    </fade-transition>

    <div class="catalog__loader">
      <fade-transition>
        <loader v-if="store.getters.isLoading"></loader>
      </fade-transition>
    </div>

    <product-list :products="productList"></product-list>
  </div>
</template>

<script setup>
import BaseHeading from "./UI/BaseHeading.vue";
import CategoryTabs from "./CategoryTabs.vue";
import BaseCard from "./UI/BaseCard.vue";
import Card from "./Card.vue";
import { mapActions, mapGetters, mapState, useStore } from "vuex";
import ProductList from "./ProductList.vue";
import BaseModal from "./UI/BaseModal.vue";
import Cart from "./Cart.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import FailedHttpRequest from "./FailedHttpRequest.vue";
import Likes from "./Likes.vue";
import Loader from "./UI/Loader.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const store = useStore();
const activeCategory = ref("all");

const setActiveCategory = (selectedCategory) => {
  activeCategory.value = selectedCategory;
};

const isTabsVisible = computed(() => store.getters.products.length > 0);

const productList = computed(() => {

  if (activeCategory.value === "all") return store.getters.products;

  return store.getters.products.filter((product) => product.category === activeCategory.value);
});
</script>

<style scoped>
.catalog {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
}

.catalog__header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
}

.catalog__header-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

hr {
  border: 0;
  width: 100%;
  border-top: 2px solid #f6f6f6;
  margin: 0;
}

.catalog__loader {
  position: relative;
}

@media screen and (min-width: 1024px) {
  .catalog__header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
