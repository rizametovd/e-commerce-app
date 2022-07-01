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

.button__success {
  align-self: stretch;
  border: 2px solid transparent;
  background-color: #5ec343;
  font-weight: 600;
  color: #fff;
  padding: 10px 20px;
}

.button__success:focus {
  transition: border 0.1s linear;
  border: 2px solid #458f31;
}

.button__success:hover {
  transition: opacity 0.3s linear;
  opacity: 0.8;
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

  .button__primary:not(:disabled):hover {
    transition: background-color 0.15s linear;
    background-color: #e2e2e2;
  }
}
</style>
