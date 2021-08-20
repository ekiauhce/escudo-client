<template>
    <v-form v-model="valid"
            ref="form"
            @submit.prevent="onSubmit">
      <v-text-field v-model="productName" @blur="clearInputIfEmpty"
        :rules="productNameRules" placeholder="Add new product"
        outlined dense background-color="white"/>

      <v-btn :disabled="!valid" :loading="loading"
             color="secondary" type="submit" block rounded>
        Enter
        <v-icon right>mdi-check</v-icon>
      </v-btn>
    </v-form>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProductEntry",
  data: function () {
    return {
      valid: false,
      productName: "",
      takenProductNames: [],
      productNameRules: [
          v => !!v.trim() || "Product name can't be empty!",
          v => !this.takenProductNames.includes(v) || "Product with this name already exists!"
      ]
    }
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("addNewProduct", {name: this.productName.trim() })
      .then(() => {
        this.productName = "";
        this.$refs.form.resetValidation();
      })
      .catch(() => {
        this.takenProductNames.push(this.productName);
        this.$refs.form.validate();
      });
    },
    clearInputIfEmpty() {
      if (!this.productName.trim()) this.productName = "";
      this.$refs.form.resetValidation();
    }
  }
}
</script>

<style scoped>

</style>
