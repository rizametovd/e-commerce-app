<template>
  <!-- <div></div> -->
  <dialog class="dialog" open>
    <h2 class="dialog__title">
      {{ title }}
    </h2>
    <section class="dialog__content">
      <slot></slot>
    </section>
    

    <section class="dialog__actions">
      <base-button @click="closeModal" type="button" mode="primary">Close modal</base-button>
      <slot name="actions"></slot>
    </section>
  </dialog>
</template>

<script>
import { mapActions } from 'vuex';
import BaseButton from './BaseButton.vue';
export default {
  components: { BaseButton },
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapActions(['closeModal'])
  }
};
</script>

<style scoped>
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
.dialog {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  padding: 0;
  border-radius: 16px;
  z-index: 1;
  border: 1px solid black;
}

.dialog__title {
  background: #fcf7eb;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 10px 0;
  
}

.dialog__content {
  padding: 0 20px;
}

.dialog__actions {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 10px 20px;
  background: #fcf7eb;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}
</style>
