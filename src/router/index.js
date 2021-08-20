import Vue from 'vue';
import Router from 'vue-router';
import RegisterPage from "../components/RegisterPage";
import ProductList from "../components/products/ProductList";
import ProductDetails from "../components/products/ProductDetails";
import LoginPage from "../components/LoginPage";
import NotFound from "../components/NotFound";

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
            component: ProductDetails,
            name: "ProductDetails",
            props: true
        },
        {
            path: "/",
            redirect: "/products"
        },
        {
            path: "*",
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (!credentials && to.path !== "/login" && to.path !== "/register") next("/login");
    else next();
});

export default router;
