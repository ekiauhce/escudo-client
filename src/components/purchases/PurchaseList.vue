<template>
    <v-container fluid class="pa-0">
      <v-row dense v-if="productItem && productItem.purchases != null">
        <v-col cols="6" v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id">
          <PurchaseListItem :purchaseItem="purchaseItem" :productItemName="productItem.name"/>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-col cols="6" v-for="index in 4" :key="index">
          <v-skeleton-loader type="list-item-two-line, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>

import PurchaseListItem from "./PurchaseListItem";

export default {
  name: "PurchaseList",
  components: { PurchaseListItem },
  props: ["productItem"]
}
</script>

<style scoped>
</style>
