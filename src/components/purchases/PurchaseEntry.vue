<template>
  <v-form class="mt-4" @submit.prevent="addNewPurchase"
          v-model="valid"
          ref="form">
    <v-text-field v-model.number="price" :rules="newPurchaseRules"
                  @blur="resetValidation"
                  placeholder="Enter purchase price" outlined dense/>
    <v-btn type="submit" color="secondary"
           :disabled="!valid" :loading="loading"
           rounded block>Add</v-btn>
  </v-form>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PurchaseEntry",
  props: ["productItem"],
  data: function () {
    return {
      price: "",
      valid: false,
      newPurchaseRules: [
        v => /^\d+$/.test(v) || /^\d+\.\d*$/.test(v) || "Purchase price must be a number!"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    addNewPurchase() {
      this.$store.dispatch("addNewPurchase",
          { productId: this.productItem.id, purchase: { price: this.price }})
          .then(() => {
            this.price = "";
            this.resetValidation();
          });
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
}
</script>

<style scoped>

</style>
