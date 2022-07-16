<template>
  <div class="catalog">
    <div class="catalog__header">
      <div class="catalog__header-container">
        <BaseHeading variant="h2">Catalog</BaseHeading>
        <CategoryTabs
          :items="allCategories"
          @onCategoryClick="setActiveCategory"
          v-if="isProducts"
        />
      </div>
      <BaseDivider />
    </div>

    <FadeTransition>
      <FailedHttpRequest
        :errorCode="error.errorCode"
        :errorMessage="error.message"
        :timeout="error.timeout"
        :serverIsDown="serverStatus.isDown"
        :serverErrorMessage="serverStatus.message"
        v-if="error?.isError && !isLoading"
      />
    </FadeTransition>

    <div class="catalog__loader">
      <FadeTransition>
        <Loader v-if="isLoading" />
      </FadeTransition>
    </div>

    <ProductList :products="productList" />
  </div>
</template>

<script setup>
import BaseHeading from "./UI/BaseHeading.vue";
import CategoryTabs from "./CategoryTabs.vue";
import ProductList from "./ProductList.vue";
import FailedHttpRequest from "./FailedHttpRequest.vue";
import Loader from "./UI/Loader.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import BaseDivider from '@/components/UI/BaseDivider.vue'
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useProductStore } from "@/store/useProductStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const {
  products,
  isProducts,
  allCategories,
  isLoading,
  error,
  serverStatus,
} = storeToRefs(productStore);

const activeCategory = ref("all");

const setActiveCategory = (selectedCategory) => {
  activeCategory.value = selectedCategory;
};

const productList = computed(() => {
  if (activeCategory.value === "all") return products.value;
  return products.value.filter(
    (product) => product.category === activeCategory.value
  );
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
