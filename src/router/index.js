import Vue from 'vue';
import Router from 'vue-router';
import RegisterPage from "../components/RegisterPage";
import ProductList from "../components/ProductList";
import PurchasesList from "../components/PurchaseList";
import LoginPage from "../components/LoginPage";

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
            name: "LoginPage",
            beforeEnter: (to, from, next) => {
                const credentials = JSON.parse(localStorage.getItem("credentials"));
                if (credentials) next("/products");
                else next();
            }
        },
        {
            path: "/products",
            component: ProductList,
            name: "ProductList"
        },
        {
            path: "/products/:productName/",
            component: PurchasesList,
            name: "PurchasesList",
            props: true
        }
    ]
});

router.beforeEach((to, from, next) => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (!credentials && to.path !== "/login" && to.path !== "/register") next("/login");
    else next();
});

export default router;
