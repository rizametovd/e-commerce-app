<template>
  <div class="delivery-location">
    <h3 class="delivery-location__title" v-if="isLocationVisible">
      <span>Your location is:</span> {{ location }}
    </h3>
    <div v-if="!isSelected" class="delivery-location__confirm-block">
      <h3>Is that correct?</h3>
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
export default {
  emits: ["onConfirmLocationClick"],
  components: { BaseIconButton, MyLocationIcon, BaseButton },
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
  font-size: 24px;
}

.delivery-location__title > span {
  color: lightgray;
}

.delivery-location__confirm-block {
  display: flex;
  flex-direction: column;
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
