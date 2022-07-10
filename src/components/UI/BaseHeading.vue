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
h1 {
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 46px;
  line-height: 60px;
}

h2 {
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 36px;
  line-height: 50px;
}

h3 {
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
}

h4 {
    font-family: 'Nunito';
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
}
</style>
