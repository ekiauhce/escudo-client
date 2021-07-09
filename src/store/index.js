import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
    credentials: null,
    productItems: []
}

const mutations = {
    SET_CREDENTIALS(state, payload) {
        state.credentials = payload;
    },
    ADD_PRODUCT(state, payload) {
        state.productItems.push(payload);
    },
    ADD_PURCHASE(state, { productId, purchase }) {
        const product = state.productItems.find(p => p.id === productId);
        product.purchases.push(purchase);
    },
    UPDATE_PRODUCT_ITEMS(state, payload) {
        state.productItems = payload;
    },
    DELETE_PURCHASE(state, { productId, purchaseId }) {
        const product = state.productItems.find(p => p.id === productId);
        const indexToRemove = product.purchases.findIndex(p => p.id === purchaseId);
        product.purchases.splice(indexToRemove, 1);
    }
}

const actions = {
    register(context, payload) {
        return axios.post("/api/register", payload,
            { headers: {"X-Requested-With": "XMLHttpRequest"} });
    },
    login(context, payload) {
        return axios.post("/api/login", payload,
            { headers: {"X-Requested-With": "XMLHttpRequest"} })
            .then(() => {
                localStorage.setItem("credentials", JSON.stringify(payload));
                context.commit("SET_CREDENTIALS", payload);
            });
    },
    logout({ commit }) {
        return new Promise(resolve => {
            localStorage.removeItem("credentials");
            commit("SET_CREDENTIALS", null);
            resolve();
        })
    },
    setCredentials(context, payload) {
        context.commit("SET_CREDENTIALS", payload);
    },
    getProductItems(context) {
        axios.get("/api/products",
            { auth: context.getters.credentials, headers: {"X-Requested-With": "XMLHttpRequest"} })
            .then(response => {
                context.commit("UPDATE_PRODUCT_ITEMS", response.data)
            });
    },
    addNewProduct(context, payload) {
        axios.post("/api/products", payload,
            { auth: context.getters.credentials, headers: {"X-Requested-With": "XMLHttpRequest"} })
            .then(response =>  {
                context.commit("ADD_PRODUCT", response.data);
            });
    },
    addNewPurchase(context, { productId, purchase }) {
        axios.post(`/api/products/${productId}/purchases`,
            purchase, { auth: context.getters.credentials, headers: {"X-Requested-With": "XMLHttpRequest"}})
            .then(response => {
                context.commit("ADD_PURCHASE", { productId, purchase: response.data })
            });
    },
    deletePurchase(context, { productId, purchaseId }) {
        axios.delete(`/api/products/${productId}/purchases/${purchaseId}`,
            { auth: context.getters.credentials, headers: {"X-Requested-With": "XMLHttpRequest"}})
            .then(() => {
                context.commit("DELETE_PURCHASE", { productId, purchaseId });
            })
    }
}

const getters = {
    credentials: state => state.credentials,
    productItems: state => state.productItems,
    productItemFromName: state => productName => {
        return state.productItems.find(p => p.name === productName);
    },
    lastPurchaseByProductId: state => productId => {
        const product = state.productItems.find(p => p.id === productId);
        const purchases = product.purchases;
        return purchases[purchases.length - 1];
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
