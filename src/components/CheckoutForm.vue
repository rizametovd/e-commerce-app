<template>
  <fade-transition>
    <base-card v-if="delivery">
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
                v-model.trim="userInput[input.name]"
                :error="formError[input?.name]"
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

const INPUT_FIELDS = [
  {
    placeholder: "Full name",
    label: "Full name",
    type: "text",
    name: "name",
    required: true,
  },
  {
    placeholder: "Your cell phone",
    label: "Phone",
    type: "text",
    name: "phone",
    required: true,
  },
  {
    placeholder: "Your e-mail",
    label: "E-mail",
    type: "text",
    name: "email",
    required: false,
  },
  {
    placeholder: "Delivery city and country",
    label: "Delivery region",
    type: "text",
    name: "location",
    required: false,
  },
  {
    placeholder: "Delivery address",
    label: "Delivery address",
    type: "text",
    name: "address",
    required: false,
  },
  {
    placeholder: "Comment",
    label: "Comment",
    type: "text",
    name: "comment",
    required: false,
  },
];

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
        email: "",
        location: "",
        address: "",
        comment: "",
      },
      formError: {
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
    ...mapActions(["clearCart"]),

    validateForm() {
      let isFormValid = true;

      if (!this.userInput.name || !this.userInput.phone) {
        this.formError = {
          name: this.userInput.name ? '' : 'This field cannot be empty',
          phone: this.userInput.phone ? '' : 'Please provide your phone number'
        }

        isFormValid = false;
      }

      return isFormValid;
    },

    submitForm() {
      if (!this.validateForm()) return;
    
      this.$router.push("/checkout/success");
      this.clearCart();
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

    userInput: {
      deep: true,
      handler(val) {
       console.log('val:', val) 
      }
      
    }
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
