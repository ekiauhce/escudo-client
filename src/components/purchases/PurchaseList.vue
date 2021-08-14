<template>
  <v-container class="pa-0">
    <v-row justify="center" no-gutters>
      <v-col sm="8" md="6" lg="4">
        <v-container class="px-1" >
          <v-row no-gutters class="mx-1" v-if="productItem">
            <v-col cols="12">
              <ProductTitle :productItem="productItem"/>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-3 mx-1">
            <v-col cols="12">
            <PurchasesSummary :productItem="productItem"/>
            </v-col>
          </v-row>
          <v-row v-if="productItem" no-gutters>
            <PurchaseListItem v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id"
              :purchaseItem="purchaseItem" :productItemId="productItem.id"/>
          </v-row>
          <v-row no-gutters class="my-3 mx-1">
            <v-col>
            <PurchaseEntry :productItem="productItem"/>
            </v-col>
          </v-row>
        </v-container>
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
