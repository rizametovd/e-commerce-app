<template>
  <component :is="variant">
    <slot> </slot>
  </component>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 36px;
  line-height: 50px;
}
</style>
