<template>
  <base-card v-if="delivery">
    <h2>Your personal data</h2>
    <div class="checkout-form">
      <base-form @submit.prevent="submitForm">
        <ul class="checkout-form__input-list">
          <li v-for="input in inputs" :key="input.label">
            <base-input
              :placeholder="input.placeholder"
              :label="input.label"
              :type="input.type"
              :name="input.name"
              v-model="userInput[input.name]"
            ></base-input>
          </li>
        </ul>

        <base-button variant="contained" type="submit" mode="success"
          >Submit an order</base-button
        >
      </base-form>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "./UI/BaseCard.vue";
import BaseForm from "./UI/BaseForm.vue";
import BaseInput from "./UI/BaseInput.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";

const INPUT_FIELDS = [
  {
    placeholder: "Full name",
    label: "Full name",
    type: "text",
    name: "name",
  },
  {
    placeholder: "Your cell phone",
    label: "Phone",
    type: "text",
    name: "phone",
  },
  {
    placeholder: "Your e-mail",
    label: "E-mail",
    type: "text",
    name: "email",
  },
  {
    placeholder: "Delivery city and country",
    label: "Delivery region",
    type: "text",
    name: "location",
  },
  {
    placeholder: "Delivery address",
    label: "Delivery address",
    type: "text",
    name: "address",
  },
  {
    placeholder: "Comment",
    label: "Comment",
    type: "text",
    name: "comment",
  },
];

export default {
  components: { BaseForm, BaseInput, BaseCard, BaseButton },
  props: {
    delivery: {
      type: [null, Object],
      required: true,
    },
    location: {
      type: [null, String],
      required: true,
    },
  },

  data() {
    return {
      inputFields: INPUT_FIELDS,
      userInput: {
        name: "",
        phone: "",
        email: "",
        location: "",
        address: "",
        comment: "",
      },
    };
  },

  methods: {
    submitForm() {
      console.log("userInput:", this.userInput);
    },
  },

  computed: {
    inputs() {
      return this.inputFields.filter((field) => {
        if (!this.delivery) return field;

        if (this.delivery.type === "pickup") {
          return field.name !== "location" && field.name !== "address";
        }

        return field;
      });
    },
  },

  watch: {
    location: {
      immediate: true,
      handler() {
        this.userInput = {
          ...this.userInput,
          location: this.location,
        };
      },
    },
  },
};
</script>

<style>
.checkout-form {
  max-width: 100%;
}
/* .checkout-form {
  background: lightblue;
  max-width: 600px;
  padding: 20px;
} */

.checkout-form__input-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  list-style: none;
  padding: 0;
}

@media screen and (min-width: 768px) {
  .checkout-form {
    max-width: 40%;
  }
}
</style>
