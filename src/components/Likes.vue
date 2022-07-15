<template>
  <ul class="likes">
    <li
      v-for="likedProduct in likedProducts"
      :key="likedProduct.id"
      class="likes__item"
    >
      <img
        :src="likedProduct.image"
        :alt="likedProduct.title"
        class="likes__image"
        @click="onClick(likedProduct.id)"
      />
      <div class="likes__product-info">
        <span
          class="likes__product-info-title"
          @click="onClick(likedProduct.id)"
          >{{ likedProduct.title }}</span
        >

        <div class="likes__product-info-container">
          <div class="likes__rating">
            <img src="../assets/star-icon.svg" />
            <p class="card__rating-text">{{ likedProduct.rating.rate }}</p>
          </div>
          <span class="likes__price"
            ><strong>${{ likedProduct.price }}</strong></span
          >
        </div>
      </div>
      <base-icon-button
        @click="store.dispatch('handleLikes', likedProduct)"
        variant="contained"
        iconHoverColor="#ef2525"
        iconColor="#74747474"
        opacity="1"
      >
        <delete-icon></delete-icon>
      </base-icon-button>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from "vuex";
import DeleteIcon from "./icons/DeleteIcon.vue";
import BaseButton from "./UI/Buttons/BaseButton.vue";
import BaseIconButton from "./UI/Buttons/BaseIconButton.vue";
import IconBase from "./UI/BaseIcon.vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["onClick"]);
const props = defineProps({
  likedProducts: {
    type: Array,
    required: true,
  },
});
const store = useStore();
const router = useRouter();

const onClick = (id) => {
  router.push(`/product/${id}`);
  emit("onClick", "likes");
};
</script>

<style>
.likes {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
}

.likes__item {
  display: grid;
  align-items: center;
  grid-template-columns: 40px 4fr 50px;
  gap: 20px;
  padding: 20px 10px;
  border-bottom: 1px solid lightgray;
}

.likes__item:last-of-type {
  border-bottom: none;
}

.likes__product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.likes__product-info-title {
  cursor: pointer;
}

.likes__product-info-title:hover {
  transition: color 0.1s linear;
  color: #ed8939;
}

.likes__product-info-container {
  display: flex;
  gap: 10px;
  color: #747474;
  font-size: 12px;
}

.likes__image {
  cursor: pointer;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.likes__image:hover {
  opacity: 0.7;
  transition: opacity 0.2s linear;
}

.likes__rating {
  display: flex;
  gap: 5px;
}
</style>
