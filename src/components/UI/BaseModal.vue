<template>
  <fade-transition>
    <div @click="closeModal(type)" class="modal__backdrop" v-if="isModalOpen"></div>
  </fade-transition>

  <fade-transition>
    <dialog class="modal" open v-if="isModalOpen">
      <h2>
        {{ title }}
      </h2>
      <section>
        <slot></slot>
      </section>

      <section class="modal__actions">
        <base-button @click="closeModal(type)" variant="outlined">{{ closeButtonText }}</base-button>
        <slot name="actions"></slot>
      </section>
    </dialog>
  </fade-transition>
</template>

<script>
import { mapActions } from 'vuex';
import BaseButton from './Buttons/BaseButton.vue';
import FadeTransition from './FadeTransition.vue';
export default {
  components: { BaseButton, FadeTransition },
  props: {
    title: {
      type: String,
      required: true,
    },
    closeButtonText: {
      type: String,
      required: false,
      default: 'Continue shopping',
    },
    isModalOpen: {
      type: Boolean,
      reqquired: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 40px 20px;
  border-radius: 16px;
  z-index: 2;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 20px;
}
.modal__actions {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}

@media screen and (min-width: 768px) {
  .modal {
    width: 700px;
  }
}

@media screen and (min-width: 1024px) {
  .modal {
    width: 800px;
  }
}
</style>
