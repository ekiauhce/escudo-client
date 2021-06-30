<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-4">
      <div class="input-group">
        <input v-model.number="price" class="form-control" type="text" placeholder="Enter purchase price"/>
        <button @click="addNewPurchase" class="btn btn-outline-secondary">Enter</button>
      </div>
      <div class="row row-cols-2">
        <div v-for="purchase in product.purchases" :key="purchase.id" class="col">

          <i class="bi bi-calendar"></i> {{ purchase.madeAt }}
          <div> {{ purchase.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PurchaseList",
  props: ["productName"],
  data: function () {
    return {
      price: ""
    };
  },
  methods: {
    addNewPurchase() {
      this.$store.dispatch("addNewPurchase",
          { productId: this.product.id, purchase: { price: this.price }});
    }
  },
  computed: {
    productItem() {
      return this.$store.getters.productItemFromName(this.productName);
    }
  }
}
</script>

<style scoped>


</style>
