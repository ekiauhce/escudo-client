<template>
  <v-col class="pa-1" cols="6">
    <v-sheet outlined class="rounded-lg">
      <v-container class="pa-2">
        <v-row dense>
          <v-col class="text-no-wrap">
            Made at:
          </v-col>
          <v-col class="text-right text-no-wrap">
            {{ formattedMadeAt }}
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            Price:
          </v-col>
          <v-col class="text-right">
            <strong>{{ purchaseItem.price }}</strong> <small>₽</small>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="text-right">
            <v-btn @click="deletePurchase" icon small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-col>
</template>

<script>
import moment from "moment";

export default {
  name: "PurchaseListItem",
  props: ["purchaseItem", "productItemId"],
  methods: {
    deletePurchase() {
      this.$store.dispatch("deletePurchase",
          { productId: this.productItemId, purchaseId: this.purchaseItem.id });
    },
  },
  computed: {
    formattedMadeAt() {
      return moment(this.purchaseItem.madeAt).format("MMM D, HH:mm");
    }
  }
}
</script>

<style scoped>

</style>
