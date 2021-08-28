<template>
    <v-container fluid>
      <v-row no-gutters justify="center">
      <v-col sm="8" md="6" lg="4">
        <v-row>
          <v-col cols="12">
            <div v-if="productItem">
              <ProductTitle :productItemName="productName"/>
            </div>
            <div v-else>
              <v-skeleton-loader type="card-heading"></v-skeleton-loader>
            </div>
          </v-col>
          <v-col cols="12">
            <div v-if="productItem">
              <PurchasesSummary :productItem="productItem"/>
            </div>
            <div v-else>
              <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
            </div>
          </v-col>

          <v-col cols="12">
            <PurchaseList :productItem="productItem"/>
          </v-col>

          <v-col cols="12">
            <div v-if="productItem">
              <PurchaseEntry :productItem="productItem"/>
            </div>
            <div v-else>
              <v-skeleton-loader type="list-item@2"></v-skeleton-loader>
            </div>
          </v-col>
        </v-row>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>

import PurchaseEntry from "../purchases/PurchaseEntry";
import PurchasesSummary from "../purchases/PurchasesSummary";
import ProductTitle from "./ProductTitle";
import {mapGetters} from "vuex";
import PurchaseList from '../purchases/PurchaseList';

export default {
  name: "ProductDetails",
  components: {
    PurchasesSummary,
    PurchaseEntry,
    PurchaseList,
    ProductTitle
  },
  props: ["productName"],
  data() {
    return {
      productItem: null
    }
  },
  created() {
    if (this.productItems == null) {
      this.$store.dispatch("getProductItems")
        .then(() => {
          this.productItem = this.$store.getters.productItemFromName(this.productName);
        })
        .then(() => this.$store.dispatch("getPurchases", { productName: this.productName }))
        .catch(() => this.$router.replace("/not-found"));
    } else if (this.productItem == null) {
      this.productItem = this.$store.getters.productItemFromName(this.productName);
      if (this.productItem.purchases == null) {
        this.$store.dispatch("getPurchases", { productName: this.productName });
      }
    }
  },
  computed: {
    ...mapGetters(["productItems"])
  }
}
</script>

<style scoped>


</style>
