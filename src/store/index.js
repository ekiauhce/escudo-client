import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT || "http://localhost:8080",
    headers: {"X-Requested-With": "XMLHttpRequest"}
});

Vue.use(Vuex);

const state = {
    credentials: null,
    loading: false,
    productItems: []
}

const mutations = {
    SET_CREDENTIALS(state, payload) {
        state.credentials = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
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
    },
    UPDATE_PRODUCT_NAME(state, { productId, newName }) {
        const product = state.productItems.find(p => p.id === productId);
        product.name = newName;
    },
    DELETE_PRODUCT(state, { productId }) {
        state.productItems = state.productItems.filter(p => p.id !== productId);
    }
}

const actions = {
    register({ commit }, payload) {
        commit("SET_LOADING", true);
        return api.post("register", payload)
            .finally(() => {
                commit("SET_LOADING", false);
            });
    },
    login({ commit }, payload) {
        commit("SET_LOADING", true);
        return api.post("login", payload)
            .then(() => {
                localStorage.setItem("credentials", JSON.stringify(payload));
                commit("SET_CREDENTIALS", payload);
            })
            .finally(() => {
                commit("SET_LOADING", false);
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
        api.get("products",{ auth: context.getters.credentials })
            .then(response => {
                context.commit("UPDATE_PRODUCT_ITEMS", response.data)
            });
    },
    addNewProduct(context, payload) {
        context.commit("SET_LOADING", true);
        return api.post("products", payload,{ auth: context.getters.credentials })
            .then(response =>  {
                context.commit("ADD_PRODUCT", response.data);
            })
            .finally(() => {
                context.commit("SET_LOADING", false);
            });
    },
    addNewPurchase(context, { productId, purchase }) {
        context.commit("SET_LOADING", true);
        return api.post(`products/${productId}/purchases`, purchase,
            { auth: context.getters.credentials })
            .then(response => {
                context.commit("ADD_PURCHASE", { productId, purchase: response.data })
            })
            .finally(() => {
                context.commit("SET_LOADING", false);
            });
    },
    deletePurchase(context, { productId, purchaseId }) {
        api.delete(`products/${productId}/purchases/${purchaseId}`,
            { auth: context.getters.credentials })
            .then(() => {
                context.commit("DELETE_PURCHASE", { productId, purchaseId });
            })
    },
    changeProductName(context, { productId, newName }) {
        // TODO: loading
        api.patch(`products/${productId}`, { name: newName },
            { auth: context.getters.credentials })
            .then(() => {
                context.commit("UPDATE_PRODUCT_NAME", { productId, newName })
            });
        // TODO: on error? 
    },
    deleteProduct(context, { productId }) {
        api.delete(`products/${productId}`, 
        { auth: context.getters.credentials })
        .then(() => {
            context.commit("DELETE_PRODUCT", { productId });
        });
        // TODO: on error? 
    }
}

const getters = {
    credentials: state => state.credentials,
    loading: state => state.loading,
    productItems: state => state.productItems,
    isProductItemsEmpty: state => state.productItems.length === 0,
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
