import { BASE_URL } from '@/constants/constants';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    cart: [],
    isCartModalOpen: false,
  },
  getters: {
    categories(state) {
      const tmp = state.products.map((product) => product.category);
      tmp.unshift('all');
      return [...new Set(tmp)];
    },

    product: (state) => (id) => {
      return state.cart.find((productItem) => productItem.id === id);
    },

    cartTotalProductsQuantity(state) {
      if (state.cart.length === 0) return;
      return state.cart.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0);
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload.products;
    },

    setProductsToCart(state, payload) {
      const product = payload.product;

      const productQuantityChanged = state.cart.find((productItem) => productItem.id === product.id);
      if (productQuantityChanged) {
        productQuantityChanged.quantity += product.quantity;
        return;
      }
      state.cart.push(product);
    },

    deleteProduct(state, payload) {
      state.cart = state.cart.filter((product) => product.id !== payload.productId);
    },

    openModal(state) {
      state.isCartModalOpen = true;
    },

    closeModal(state) {
      state.isCartModalOpen = false;
    },

    incrementQuantity(_, payload) {
      payload.product.quantity++;
    },

    decrementQuantity(_, payload) {
      payload.product.quantity--;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch(BASE_URL);

        if (!response.ok) throw new Error('Something went wrong');

        const products = await response.json();
        commit('setProducts', { products });
      } catch (error) {
        console.log('error:', error);
      }
    },

    setProductsToCart({ commit }, product) {
      commit('setProductsToCart', { product });
      commit('openModal');
    },

    openModal({ commit }) {
      commit('openModal');
    },

    closeModal({ commit }) {
      commit('closeModal');
    },

    incrementQuantity({ commit, getters }, productId) {
      const product = getters.product(productId);
      commit('incrementQuantity', { product });
    },

    decrementQuantity({ commit, getters }, productId) {
      const product = getters.product(productId);
      commit('decrementQuantity', { product });
    },

    deleteProduct({ commit }, productId) {
      commit('deleteProduct', { productId });
    },
  },
  modules: {},
});
