import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from '../pages/CheckoutPage.vue';
import CheckoutSuccessPage from '../pages/CheckoutSuccessPage.vue';
import HomePage from '../pages/HomePage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/checkout',
    component: CheckoutPage,
  },
  {
    path: '/checkout/success',
    component: CheckoutSuccessPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
