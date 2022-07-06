<template>
  <header class="header">
    <router-link to="/" class="header__logo">Logo</router-link>

    <ul>
      <li>
        <base-button-with-badge
          :quantity="totalLikes"
          @click="openModal('likesModal')"
        >
          <like-icon></like-icon>
        </base-button-with-badge>
      </li>

      <li>
        <base-button-with-badge
          :quantity="cartTotalProductsQuantity"
          @click="openModal('cartModal')"
        >
          <cart-icon></cart-icon>
        </base-button-with-badge>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartIcon from "./icons/CartIcon.vue";

import LikeIcon from "./icons/LikeIcon.vue";
import BaseButtonWithBadge from "./UI/Buttons/BaseButtonWithBadge.vue";
export default {
  components: { CartIcon, LikeIcon, BaseButtonWithBadge },

  methods: {
    ...mapActions(["openModal"]),
  },
  computed: {
    ...mapGetters(["cartTotalProductsQuantity", "totalLikes"]),
  },
};
</script>

<style scoped>
.header {
  display: grid;
  align-items: center;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
}

.header__logo {
  justify-self: start;
  font-weight: 600;
  font-size: 48px;
  color: lightgray;
  text-decoration: none;
}

ul {
  display: flex;
  gap: 25px;
  justify-self: end;
  list-style: none;
  padding: 0;
}

@media screen and (min-width: 768px) {
  .header {
    padding: 0;
  }
}
</style>
