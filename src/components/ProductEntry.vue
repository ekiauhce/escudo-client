<template>
  <li class="list-group-item p-0 sticky-top">
    <div class="input-group">
      <input v-model="productName" class="form-control" type="text" placeholder="Add product"/>
      <button @click="addNewProduct" class="btn btn-outline-secondary">Enter</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ProductEntry",
  data: function () {
    return {
      productName: ""
    }
  },
  methods: {
    addNewProduct() {
      this.$store.dispatch("addNewProduct", {name: this.productName});
    }
  }
}
</script>

<style scoped>

</style>
