<template>
    <v-container fluid class="d-flex flex-column align-center pa-0">
      <v-col sm="8" md="6" lg="4" v-if="productItem">
        <ProductTitle :productItem="productItem"/>
      </v-col>
      <v-col sm="8" md="6" lg="4" v-if="productItem">
            <PurchasesSummary :productItem="productItem"/>
      </v-col>
      <v-col sm="8" md="6" lg="4" v-if="productItem">
        <v-row dense>
            <PurchaseListItem v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id"
              :purchaseItem="purchaseItem" :productItemId="productItem.id"/>
        </v-row>
      </v-col>
      <v-col sm="8" md="6" lg="4" v-if="productItem">
      <PurchaseEntry :productItem="productItem"/>
      </v-col>
  </v-container>
</template>

<script>

import PurchaseListItem from "./PurchaseListItem";
import PurchaseEntry from "./PurchaseEntry";
import PurchasesSummary from "./PurchasesSummary";
import ProductTitle from "../products/ProductTitle";
import {mapGetters} from "vuex";

export default {
  name: "PurchaseList",
  components: {
    PurchasesSummary,
    PurchaseEntry,
    PurchaseListItem,
    ProductTitle
  },
  props: ["productName"],
  computed: {
    ...mapGetters(["isProductItemsEmpty"]),
    productItem() {
      return this.$store.getters.productItemFromName(this.productName);
    }
  },
  watch: {
    isProductItemsEmpty() {
      if (!this.productItem) this.$router.push("/not-found");
    }
  }
}
</script>

<style scoped>


</style>
