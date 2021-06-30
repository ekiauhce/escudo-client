<template>
  <div class="container d-flex flex-column align-items-center">
    <ul class="list-group col-md-4">
      <ProductEntry/>
      <li v-for="product in products" :key="product.id"
          class="list-group-item list-group-item-action">
        <ProductListItem :product="product"/>
      <li/>
    </ul>
  </div>
</template>

<script>
import ProductEntry from "./ProductEntry";
import ProductListItem from "./ProductListItem";
export default {
  name: "ProductList",
  data: function () {
    return {
      products: []
    };
  },
  created() {
    this.$store.dispatch("getProductItems");
  },
  components: {
    ProductListItem,
    ProductEntry
  }
}
</script>

<style scoped>

</style>
