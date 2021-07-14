<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="8" md="6" lg="4">
        <v-container class="px-2">
          <v-row v-if="productItem">
            <PurchaseListItem v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id"
                              :purchaseItem="purchaseItem" :productItemId="productItem.id"/>
          </v-row>
        </v-container>
        <v-divider class="mt-3"></v-divider>
        <PurchasesSummary :productItem="productItem"/>
        <v-divider></v-divider>
        <PurchaseEntry :productItem="productItem"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import PurchaseListItem from "./PurchaseListItem";
import PurchaseEntry from "./PurchaseEntry";
import PurchasesSummary from "./PurchasesSummary";

export default {
  name: "PurchaseList",
  components: {
    PurchasesSummary,
    PurchaseEntry,
    PurchaseListItem
  },
  props: ["productName"],
  computed: {
    productItem() {
      return this.$store.getters.productItemFromName(this.productName);
    }
  }
}
</script>

<style scoped>


</style>
