<template>
  <fade-transition>
    <base-card>
      <base-heading variant="h2">Your personal data</base-heading>
      <div class="checkout-form">
        <base-form @submit.prevent="submitForm">
          <ul class="checkout-form__input-list">
            <li v-for="input in inputs" :key="input.label">
              <base-input
                :placeholder="input.placeholder"
                :label="input.label"
                :type="input.type"
                :name="input.name"
                :required="input.required"
                :error="formError[input?.name]"
                :value="userInput[input.name]"
                :handleChange="handleChange"
              ></base-input>
            </li>
          </ul>

          <base-button variant="contained" type="submit" mode="success"
            >Submit</base-button
          >
        </base-form>
      </div>
    </base-card>
  </fade-transition>
</template>

<script>
import { mapActions } from "vuex";
import BaseCard from "./UI/BaseCard.vue";
import BaseForm from "./UI/BaseForm.vue";
import BaseHeading from "./UI/BaseHeading.vue";
import BaseInput from "./UI/BaseInput.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import FadeTransition from "./UI/FadeTransition.vue";
import { INPUT_FIELDS } from '@/constants/checkoutFormInputs';

export default {
  components: {
    BaseForm,
    BaseInput,
    BaseCard,
    BaseButton,
    BaseHeading,
    FadeTransition,
  },
  props: {
    delivery: {
      type: [null, Object],
      required: true,
    },
    location: {
      type: [null, String],
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      inputFields: INPUT_FIELDS,
      userInput: {
        name: "",
        phone: "",
        comment: "",
        location: "",
        email: "",
        address: "",
      },
      formError: {},
    };
  },

  methods: {
    ...mapActions(["clearCart"]),

    handleChange(e) {
      const field = e.target.name;
      const value = e.target.value;

      this.clearValidation(field);

      this.userInput = {
        ...this.userInput,
        [field]: value,
      };
    },

    clearValidation(field) {
      if (field) {
        this.formError = {
          ...this.formError,
          [field]: "",
        };
        return;
      }
      this.formError = {};
    },

    validateForm() {
      let isFormValid = true;
      const isNameInputValid = this.userInput.name.trim().length > 2;
      const isPhoneValid =
        this.userInput.phone.trim().length >= 10 &&
        this.userInput.phone.trim().length <= 20;

      if (!isNameInputValid || !isPhoneValid) {
        this.formError = {
          name: isNameInputValid
            ? ""
            : "Name cannot be less or equal than 2 letters",
          phone: isPhoneValid ? "" : "Phone number digits range is 10-20",
        };

        isFormValid = false;
      }

      return isFormValid;
    },

    submitForm() {
      if (!this.validateForm()) return;

      console.log("order:", {
        id: 1,
        customer: {
          name: this.userInput.name,
          phone: this.userInput.phone,
          email: this.userInput.email,
          comment: this.userInput.comment,
        },
        products: this.cart,
        delivery: {
          ...this.delivery,
          region: this.userInput.location,
          address: this.userInput.address,
        },
      });

      this.$router.push("/checkout/success");
      this.clearCart();
      this.userInput = {};
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

.checkout-form__input-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
}

@media screen and (min-width: 768px) {
  .checkout-form {
    max-width: 40%;
  }
}
</style>
