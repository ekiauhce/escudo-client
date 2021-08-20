<template>
<v-card outlined>
  <v-card-title>
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col v-if="isEditing">
          <v-form @submit.prevent="changeProductName()" v-model="valid" ref="form">
            <v-text-field dense hide-details="auto" outlined autofocus
                  @blur="isEditing = !isEditing"
                  v-model="newName" :placeholder="productItemName">
              <template v-slot:append-outer>
                <v-btn icon small type="submit">
                  <v-icon tile> mdi-checkbox-marked</v-icon>
                </v-btn>
              </template>
            </v-text-field> 
          </v-form>
        </v-col>
        <v-col v-else @click="isEditing = !isEditing" class="py-1 flex-grow-1" cols="auto">
          {{ productItemName }}
        </v-col>
        <v-col v-if="!isEditing" class="flex-shrink-1" cols="auto">
          <v-btn icon @click="deleteProduct()">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card-title>
</v-card>
</template>

<script>
export default {
  name: "ProductTitle",
  props: ["productItemName"],
  data() {
    return {
      valid: false,
      isEditing: false,
      newName: ""
    }
  },
  methods: {
    changeProductName() {
      this.$store.dispatch("changeProductName", {
        productName: this.productItemName,
        newName: this.newName
      });
      this.isEditing = false;
      this.$router.replace(this.newName);
      this.newName = ""; 
    },
    deleteProduct() {
      this.$store.dispatch("deleteProduct", {
        productName: this.productItemName
      });
      this.$router.replace("/products");
    }
  }
}
</script>

<style>

</style>