<template>
  <header class="header">
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
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
}

ul {
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  align-items: center;
  grid-column-start: 2;
  list-style: none;
  padding: 0;
}

@media screen and (min-width: 768px) {
  .header {
    padding: 0;
  }
}
</style>
