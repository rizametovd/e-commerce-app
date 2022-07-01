<template>
  <transition name="modal">
    <div @click="closeModal" class="modal__backdrop" v-if="isModalOpen"></div>
  </transition>

  <transition name="modal">
    <dialog class="modal" open v-if="isModalOpen">
      <h2>
        {{ title }}
      </h2>
      <section>
        <slot></slot>
      </section>

      <section class="modal__actions">
        <base-button @click="closeModal" type="button" mode="primary">Close modal</base-button>
        <slot name="actions"></slot>
      </section>
    </dialog>
  </transition>
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
    isModalOpen: {
      type: Boolean,
      reqquired: true,
      default: false,
    },
  },

  methods: {
    ...mapActions(['closeModal']),
  },
};
</script>

<style scoped>
.modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: none;
  overflow: hidden;
  z-index: 1;
}
.modal {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  padding: 40px 20px;
  border-radius: 16px;
  z-index: 2;
  border: 1px solid black;
}

.modal__actions {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

.modal-enter-active {
  animation: modal 0.2s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
