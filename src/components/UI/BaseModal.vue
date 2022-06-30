<template>
  <!-- <div></div> -->
  <dialog open>
    <h2>
      {{ title }}
    </h2>
    <slot></slot>
  </dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.228);
  box-shadow: none;
  overflow: hidden;
  z-index: 10;
} */
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  /* min-height: 300px; */
  padding: 20px;
  border-radius: 16px;
  z-index: 100;
}
</style>
