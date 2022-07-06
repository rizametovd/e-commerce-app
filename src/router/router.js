import { createRouter, createWebHistory } from "vue-router";
import CheckoutPage from '../pages/CheckoutPage.vue';
import HomePage from '../pages/HomePage.vue';
import Catalog from '../components/Catalog.vue';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/checkout',
        component: CheckoutPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;