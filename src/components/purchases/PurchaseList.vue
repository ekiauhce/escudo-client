<template>
    <v-container fluid>
      <v-row no-gutters justify="center">
      <v-col sm="8" md="6" lg="4" v-if="productItem">
        <v-row>
          <v-col cols="12">
            <ProductTitle :productItem="productItem"/>
          </v-col>
          <v-col cols="12">
            <PurchasesSummary :productItem="productItem"/>
          </v-col>
          <v-col cols="12">
            <v-row dense>
              <v-col cols="6" v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id">
                <PurchaseListItem :purchaseItem="purchaseItem" :productItemId="productItem.id"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
          <PurchaseEntry :productItem="productItem"/>
          </v-col>
        </v-row>
      </v-col>
      </v-row>
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
