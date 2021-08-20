<template>
  <v-form @submit.prevent="addNewPurchase" 
    v-model="valid" ref="form">
    <v-text-field v-model.number="price" :rules="newPurchaseRules"
                  @blur="resetValidation"
                  placeholder="Enter purchase price" outlined dense
                  background-color="white"/>
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
        v => /^[1-9]{1}\d*$/.test(v) || /^[1-9]{1}\d*\.\d*$/.test(v) ||
          "Purchase price must be a positive number!"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    addNewPurchase() {
      this.$store.dispatch("addNewPurchase", 
      { 
        productName: this.productItem.name,
        purchase: { price: this.price }
      }
      ).then(() => {
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
