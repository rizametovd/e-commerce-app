import { clearLocalStorare, wait } from '@/utils/helpers';
import { createStore } from 'vuex';

const FETCH_ATTEMPTS_COUNT = 3;
const FETCH_DELAY_REQUEST_MS = 3000;
const BASE_URL = 'https://fakestoreapi.com/products';
const FETCH_ERROR_MESSAGE = "Something went wrong. I'll try to fetch data again in";
const SERVER_ERROR_MESSAGE = 'We are sorry. Server is temporarily down. Please try again later';

export default createStore({
  state: {
    products: [],
    cart: [],
    likes: [],
    isCartModalOpen: false,
    isLikesModalOpen: false,
    error: {
      isError: false,
      message: null,
      errorCode: null,
      type: null,
      timeout: null,
    },
    isLoading: false,
    serverStatus: {
      isDown: false,
      message: null,
    },
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    },

    error(state) {
      return state.error;
    },

    isCartModalOpen(state) {
      return state.isCartModalOpen;
    },

    isLikesModalOpen(state) {
      return state.isLikesModalOpen;
    },

    cart(state) {
      return state.cart;
    },

    likes(state) {
      return state.likes;
    },

    products(state) {
      return state.products;
    },

    isLoading(state) {
      return state.isLoading;
    },

    categories(state) {
      const tmp = state.products.map((product) => product.category);
      tmp.unshift('all');
      return [...new Set(tmp)];
    },

    product: (state) => (id) => {
      return state.products.find((productItem) => productItem.id === +id);
    },

    selectedProduct: (state) => (id) => {
      return state.cart.find((productItem) => productItem.id === id);
    },

    likedProduct: (state) => (id) => {
      return state.likes.find((productItem) => productItem.id === id);
    },

    cartTotalProductsQuantity(state) {
      if (state.cart.length === 0) return;
      return state.cart.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0);
    },

    totalLikes(state) {
      if (state.likes.length === 0) return;
      return state.likes.length;
    },
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },

    setServerStatus(state, serverStatus) {
      state.serverStatus = serverStatus;
    },

    setLike(state, product) {
      state.likes.push(product);
    },

    unLike(state, productId) {
      state.likes = state.likes.filter((product) => product.id !== productId);
    },

    setProducts(state, products) {
      state.products = products;
    },

    setProductToCart(state, product) {
      state.cart.push(product);
    },

    deleteProduct(state, productId) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    },

    clearCart(state) {
      state.cart = [];
    },

    openModal(state, modalType) {
      switch (modalType) {
        case 'cartModal':
          state.isCartModalOpen = true;
          break;
        case 'likesModal':
          state.isLikesModalOpen = true;
          break;
        default:
          state.isCartModalOpen = true;
      }
    },

    closeModal(state, modalType) {
      switch (modalType) {
        case 'cart':
          state.isCartModalOpen = false;
          break;
        case 'likes':
          state.isLikesModalOpen = false;
          break;
        default:
          state.isCartModalOpen = false;
      }
    },

    incrementQuantity(_, product) {
      product.quantity++;
    },

    decrementQuantity(_, product) {
      product.quantity--;
    },

    setError(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchProducts({ commit, dispatch }, attempt = 1) {
      try {
        commit('setIsLoading', true);

        const response = await fetch(BASE_URL);

        if (!response.ok) {
          await wait(1000);
          throw new Error(FETCH_ERROR_MESSAGE, { cause: { status: response.status } });
        }

        const products = await response.json();
        commit('setProducts', products);
      } catch (e) {
        commit('setIsLoading', false);

        if (attempt <= FETCH_ATTEMPTS_COUNT) {
          commit('setError', {
            isError: true,
            message: e.message,
            errorCode: e.cause.status,
            timeout: attempt * (FETCH_DELAY_REQUEST_MS / 1000),
          });

          await wait(attempt * FETCH_DELAY_REQUEST_MS);
          return dispatch('fetchProducts', attempt + 1);
        }

        commit('setServerStatus', { isDown: true, message: SERVER_ERROR_MESSAGE });
      } finally {
        commit('setIsLoading', false);
      }
    },

    handleLikes({ commit, getters }, product) {
      const likedProduct = getters.likedProduct(product.id);

      if (likedProduct) {
        commit('unLike', product.id);
        return;
      }
      commit('setLike', product);
    },

    setProductToCart({ commit }, product) {
      commit('setProductToCart', product);
      commit('openModal', 'cartModal');
    },

    setDataFromLocalStorage({ commit }, { mutation, products }) {
      if (!products) return;

      products.forEach((product) => commit(mutation, product));
    },

    clearCart({ commit }) {
      commit('clearCart');
      clearLocalStorare('cart');
    },

    openModal({ commit }, type) {
      commit('openModal', type);
    },

    closeModal({ commit }, type) {
      commit('closeModal', type);
    },

    incrementQuantity({ commit, getters }, productId) {
      const product = getters.selectedProduct(productId);
      commit('incrementQuantity', product);
    },

    decrementQuantity({ commit, getters }, productId) {
      const product = getters.selectedProduct(productId);
      commit('decrementQuantity', product);
    },

    deleteProduct({ commit }, productId) {
      commit('deleteProduct', productId);
    },
  },
  modules: {},
});
