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
    productItems: null
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
    ADD_PURCHASE(state, { productName, purchase }) {
        const product = state.productItems.find(p => p.name === productName);
        product.purchases.push(purchase);
    },
    UPDATE_PRODUCT_ITEMS(state, payload) {
        state.productItems = payload;
    },
    SET_PURCHASES(state, { productName, purchases }) {
        const product = state.productItems.find(p => p.name == productName);
        product.purchases = purchases;
    },
    DELETE_PURCHASE(state, { productName, purchaseId }) {
        const product = state.productItems.find(p => p.name === productName);
        const indexToRemove = product.purchases.findIndex(p => p.id === purchaseId);
        product.purchases.splice(indexToRemove, 1);
    },
    UPDATE_PRODUCT_NAME(state, { productName, newName }) {
        const product = state.productItems.find(p => p.name === productName);
        product.name = newName;
    },
    DELETE_PRODUCT(state, { productName }) {
        state.productItems = state.productItems.filter(p => p.name !== productName);
    },
    SET_PURCHASES_SUMMARY(state, { productName, summary }) {
        const product = state.productItems.find(p => p.name === productName);
        product.summary = summary;
    },
    SET_LATEST_PURCHASE_MADE_AT(state, { productName, timestamp }) {
        const product = state.productItems.find(p => p.name == productName);
        product.latestPurchaseMadeAt = timestamp;
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
        return api.get("products", { auth: context.getters.credentials })
            .then(response => {
                context.commit("UPDATE_PRODUCT_ITEMS", response.data)
            });
    },
    addNewProduct(context, payload) {
        context.commit("SET_LOADING", true);
        return api.post("products", payload, { auth: context.getters.credentials })
            .then(response =>  {
                context.commit("ADD_PRODUCT", response.data);
            })
            .finally(() => {
                context.commit("SET_LOADING", false);
            });
    },
    getPurchases(context, { productName }) {
        return api.get(`products/${productName}/purchases`, { auth: context.getters.credentials })
            .then(response => {
                const purchases = response.data;
                context.commit("SET_PURCHASES", { productName, purchases })
            });
    },
    addNewPurchase(context, { productName, purchase }) {
        context.commit("SET_LOADING", true);

        return api.post(`products/${productName}/purchases`, purchase,
            { auth: context.getters.credentials })
            .then(response => {
                const purchase = response.data.purchase;
                const summary = response.data.summary;
                const timestamp = response.data.latestPurchaseMadeAt;

                context.commit("ADD_PURCHASE", { productName, purchase });
                context.commit("SET_PURCHASES_SUMMARY", { productName, summary });
                context.commit("SET_LATEST_PURCHASE_MADE_AT", { productName, timestamp });
            })
            .finally(() => {
                context.commit("SET_LOADING", false);
            });
    },
    deletePurchase(context, { productName, purchaseId }) {
        api.delete(`products/${productName}/purchases/${purchaseId}`,
            { auth: context.getters.credentials })
            .then(response => {
                context.commit("DELETE_PURCHASE", { productName, purchaseId });

                const summary = response.data.summary;
                const timestamp = response.data.latestPurchaseMadeAt;

                context.commit("SET_PURCHASES_SUMMARY", { productName, summary });
                context.commit("SET_LATEST_PURCHASE_MADE_AT", { productName, timestamp });
            })
    },
    changeProductName(context, { productName, newName }) {
        // TODO: loading
        api.patch(`products/${productName}`, { name: newName },
            { auth: context.getters.credentials })
            .then(() => {
                context.commit("UPDATE_PRODUCT_NAME", { productName, newName })
            });
        // TODO: on error? 
    },
    deleteProduct(context, { productName }) {
        api.delete(`products/${productName}`, 
        { auth: context.getters.credentials })
        .then(() => {
            context.commit("DELETE_PRODUCT", { productName });
        });
        // TODO: on error? 
    },
    getPurchasesSummary(context, { productName }) {
        api.get(`products/${productName}/summary`,
        { auth: context.getters.credentials })
        .then(response => {
            const summary = response.data;

            context.commit("SET_PURCHASES_SUMMARY", { productName, summary });
        });
    }
}

const getters = {
    credentials: state => state.credentials,
    loading: state => state.loading,
    productItems: state => state.productItems,
    isProductItemsEmpty: state => state.productItems.length === 0,
    productItemFromName: state => productName => {
        if (state.productItems == null) {
            return null;
        }
        return state.productItems.find(p => p.name === productName);
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
