<template>
  <button class="badge">
    <slot></slot>
    <div class="badge__active" v-if="quantity">{{ quantity }}</div>
  </button>
</template>

<script>
import CartIcon from '../icons/CartIcon.vue';
import IconBase from './IconBase.vue';
export default {
  components: { IconBase, CartIcon },
  props: {
    quantity: {
      type: Number,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
.badge {
  position: relative;
}
.badge__active {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  position: absolute;
  top: -15px;
  right: -15px;
  border: 2px solid white;
  background: #ffa801;
  border-radius: 50%;
  width: 18px;
  height: 18px;
}
</style>
