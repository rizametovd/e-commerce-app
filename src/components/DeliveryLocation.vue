<template>
  <div class="delivery-location">
    <base-heading variant="h3" v-if="isLocationVisible">
      <span class="delivery-location__title">Your location is:</span>
      {{ location }}
    </base-heading>
    <div v-if="!isSelected" class="delivery-location__confirm-block">
      <base-heading variant="h3">Is that correct?</base-heading>
      <div class="delivery-location__actions">
        <base-button variant="outlined" @click="confirm(false)">No</base-button>
        <base-button variant="contained" mode="success" @click="confirm(true)"
          >Yes</base-button
        >
      </div>
    </div>

    <h3 v-if="isSelected" :class="[isCorrectRegion ? 'success' : 'fail']">
      {{ message }}
    </h3>
  </div>
</template>

<script>
import MyLocationIcon from "./icons/MyLocationIcon.vue";
import BaseIconButton from "./UI/Buttons/BaseIconButton.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import BaseHeading from "./UI/BaseHeading.vue";
export default {
  emits: ["onConfirmLocationClick"],
  components: { BaseIconButton, MyLocationIcon, BaseButton, BaseHeading },
  props: {
    location: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isCorrectRegion: false,
      isSelected: false,
    };
  },

  methods: {
    confirm(isConfirmed) {
      this.isCorrectRegion = isConfirmed;
      this.isSelected = true;
      this.$emit("onConfirmLocationClick", isConfirmed);
    },
  },

  computed: {
    message() {
      return this.isCorrectRegion
        ? "Thank you. Your region will be set automatically"
        : "We are sorry. Please enter your delivery region manually in the form below";
    },

    isLocationVisible() {
      return (
        (this.location && !this.isSelected) ||
        (this.location && this.isSelected && this.isCorrectRegion)
      );
    },
  },
};
</script>

<style scoped>
.delivery-location {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.delivery-location__title {
  color: lightgray;
}

.delivery-location__confirm-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.delivery-location__actions {
  display: flex;
  gap: 20px;
}

.success {
  color: #5ec343;
}

.fail {
  color: #ef2525;
}
</style>
