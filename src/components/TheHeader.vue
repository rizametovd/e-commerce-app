<template>
  <header class="header">
    <router-link
      to="/"
      :class="[
        'header__logo',
        isHomepage ? 'header__logo-disabled' : 'header__logo_active',
      ]"
      disabled="true"
    >
      <img src="@/assets/logo.svg" class="header__logo" />
    </router-link>

    <ul>
      <li>
        <base-button-with-badge
          :quantity="totalLikes"
          @click="store.dispatch('openModal', 'likesModal')"
        >
          <LikeIcon />
        </base-button-with-badge>
      </li>

      <li>
        <BaseButtonWithBadge
          :quantity="cartTotalProductsQuantity"
          @click="store.dispatch('openModal', 'cartModal')"
        >
          <CartIcon />
        </BaseButtonWithBadge>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import CartIcon from "./icons/CartIcon.vue";
import LikeIcon from "./icons/LikeIcon.vue";
import BaseButtonWithBadge from "./UI/Buttons/BaseButtonWithBadge.vue";

const store = useStore();
const route = useRoute();

const cartTotalProductsQuantity = computed(
  () => store.getters.cartTotalProductsQuantity
);
const totalLikes = computed(() => store.getters.totalLikes);
const isHomepage = computed(() => route.fullPath === "/");
</script>

<style scoped>
.header {
  display: grid;
  align-items: center;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 0 10px;
}

.header__logo {
  width: 110px;
  justify-self: start;
  color: lightgray;
  text-decoration: none;
}

ul {
  display: flex;
  gap: 14px;
  justify-self: end;
  list-style: none;
  padding: 0;
}

.header__logo-disabled {
  pointer-events: none;
}

.header__logo_active {
  color: #ffa801;
}

.header__logo_active:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease-in;
}

@media screen and (min-width: 768px) {
  .header {
    padding: 0;
  }

  .header__logo {
    width: 160px;
  }

  ul {
    gap: 25px;
  }
}
</style>
