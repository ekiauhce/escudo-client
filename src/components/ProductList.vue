<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="8" md="6" lg="4">
        <v-list>
          <ProductListItem v-for="product in productItems"
                             :key="product.id" :product="product"/>
        </v-list>
        <v-divider></v-divider>
        <ProductEntry class="mt-3"/>
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
