<template>
  <header>
    <ul>
      <li>
        <base-button-with-badge :quantity="cartTotalLikes" @click="openModal('likes')">
          <icon-base>
            <like-icon></like-icon>
          </icon-base>
        </base-button-with-badge>
      </li>

      <li>
        <base-button-with-badge :quantity="cartTotalProductsQuantity" @click="openModal('cart')">
          <icon-base>
            <cart-icon></cart-icon>
          </icon-base>
        </base-button-with-badge>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartIcon from './icons/CartIcon.vue';

import LikeIcon from './icons/LikeIcon.vue';
import BaseButtonWithBadge from './UI/BaseButtonWithBadge.vue';
import IconBase from './UI/IconBase.vue';
export default {
  components: { IconBase, CartIcon, LikeIcon, BaseButtonWithBadge },

  methods: {
    ...mapActions(['openModal']),
  },
  computed: {
    ...mapGetters(['cartTotalProductsQuantity', 'cartTotalLikes']),
  },
};
</script>

<style scoped>
header {
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

li {
  display: flex;
  padding: 10px;
  border-radius: 50%;
  background-color: #f1f1f1;
  position: relative;
}
button {
  padding: 0;
  border: none;
  cursor: pointer;
}

.active {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  position: absolute;
  top: -5px;
  right: -5px;
  border: 2px solid white;
  background: #ffa801;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
</style>
