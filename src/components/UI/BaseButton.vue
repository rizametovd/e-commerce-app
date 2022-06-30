<template>
  <button :class="buttonType" type="button" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      tyle: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
    },
  },

  computed: {
    buttonType() {
      return ['button', { ['button__' + [this.mode]]: Boolean(this.mode) }];
    },
  },
};
</script>

<style>
.button {
  background: #ffffff;
  border: none;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 8px;
}

.button__primary {
    padding: 10px 20px;
}

.button__icon {
  border: none;
}

.button__icon:hover {
  transition: fill 0.2s linear;
  background-color: transparent;
  fill: #ef2525;
}

.button:disabled {
  fill: lightgray;
  cursor: default;
}

@media screen and (min-width: 768px) {
  .button__secondary:not(:disabled):hover {
    transition: background-color 0.15s linear;
    background-color: #e2e2e2;
  }
}
</style>
