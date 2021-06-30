import Vue from 'vue';
import Router from 'vue-router';
import RegisterPage from "../components/RegisterPage";
import ProductList from "../components/ProductList";
import PurchasesList from "../components/PurchaseList";
import LoginPage from "../components/LoginPage";
import store from "../store";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/register",
            component: RegisterPage,
            name: "RegisterPage"
        },
        {
            path: "/login",
            component: LoginPage,
            name: "LoginPage"
        },
        {
            path: "/products",
            component: ProductList,
            name: "ProductList",
            meta: { requiresAuth: true }
        },
        {
            path: "/products/:productName/",
            component: PurchasesList,
            name: "PurchasesList",
            meta: { requiresAuth: true },
            props: true
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
        if (!store.getters.credentials) next("/login");
        else next();
    } else next();
});

export default router;
