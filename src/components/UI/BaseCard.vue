<template>
  <div :class="['base__card', isFullWidth && 'base__card_full-width']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isFullWidth: {
      type: Boolean,
      required: false,
    },
    elHeight: {},
  },
};
</script>

<style scoped>
.base__card {
  display: inline-block;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #fbfbfb;
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  height: v-bind(elHeight + "px");
  transition: "all 3s ease-in-out";
}

.base__card_full-width {
  width: 100%;
}

@media screen and (min-width: 768px) {
}
</style>
