<template>
  <div class="base-input">
    <label for="input" class="base-input__label">{{ label }}</label>
    <input

      id="input"
      :placeholder="placeholder"
      :type="type"
      class="base-input__input"
      :name="name"
       @input="$emit('update:modelValue', $event.target.value)"
       :value="modelValue"
    />
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    modelValue: {}
  },
};
</script>

<style>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.base-input__label {
  align-self: flex-start;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #333333;
}

.base-input__input {
  font-size: 16px;
  line-height: 20px;
  color: #222222;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid lightgray;
}

.base-input__input::placeholder {
  font-size: 14px;
  color: lightgray;
}
</style>
