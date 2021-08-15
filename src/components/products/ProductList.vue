<template>
  <v-container fluid class="d-flex flex-column align-center pa-0">
      <v-col sm="8" md="6" lg="4">
        <v-card outlined>
          <v-card-title>
            Product list
          </v-card-title>
        </v-card>
      </v-col>
      <v-col sm="8" md="6" lg="4">
        <v-list v-if="productItems.length != 0" class="py-0" outlined>
          <ProductListItem v-for="product in productItems"
                             :key="product.id" :product="product"/>
        </v-list>
      </v-col>
      <v-col sm="8" md="6" lg="4">
        <ProductEntry/>
      </v-col>
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
