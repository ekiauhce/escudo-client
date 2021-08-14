<template>
  <v-container class="pa-0 mt-5">
    <v-row justify="center" no-gutters>
      <v-col sm="8" md="6" lg="4">
        <v-list v-if="productItems.length != 0" class="py-0">
          <ProductListItem v-for="product in productItems"
                             :key="product.id" :product="product"/>
        </v-list>
        <ProductEntry class="mt-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductEntry from "./ProductEntry";
import ProductListItem from "./ProductListItem";
import {mapGetters} from "vuex";

export default {
  name: "ProductList",
  computed: {
    ...mapGetters(["productItems"])
  },
  components: {
    ProductListItem,
    ProductEntry
  }
}
</script>

<style scoped>

</style>
