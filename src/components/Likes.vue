<template>
  <ul class="likes">
    <li v-for="like in likedProducts" :key="like.id" class="likes__item">
      <img :src="like.image" :alt="like.image" class="likes__image" />
      <span>{{ like.title }}</span>
      <span>{{ like.rating }}</span>
      <span>${{ like.price }}</span>
      <base-button @click="handleLikes(like)">
        <icon-base>
          <delete-icon></delete-icon>
        </icon-base>
      </base-button>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';
import DeleteIcon from './icons/DeleteIcon.vue';
import BaseButton from './UI/BaseButton.vue';
import IconBase from './UI/IconBase.vue';
export default {
  components: { BaseButton, IconBase, DeleteIcon },
  props: {
    likedProducts: {
      type: Array,
      required: true,
    },
  },

  methods: {
    ...mapActions(['handleLikes'])
  }
};
</script>

<style>
.likes {
  display: flex;
  gap: 20px;
  flex-direction: column;
  list-style: none;
  padding: 0;
}

.likes__item {
  display: grid;
  grid-template-columns: 1fr 6fr 1fr 1fr 1fr;
  gap: 20px;
}

.likes__image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
