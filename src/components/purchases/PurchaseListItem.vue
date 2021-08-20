<template>
  <v-container class="pa-0">
    <v-sheet outlined class="rounded-lg">
      <v-container>
        <v-row no-gutters>
          <v-col cols="auto" class="flex-shrink-1">
            At:
          </v-col>
          <v-col class="text-right">
            {{ formattedMadeAt }}
          </v-col>
        </v-row>
        <v-row no-gutters class="my-1">
          <v-col cols="auto" class="flex-shrink-1">
            Price:
          </v-col>
          <v-col class="text-right">
            <strong>{{ purchaseItem.price }}</strong> <small>₽</small>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="text-right">
            <v-btn @click="deletePurchase" icon small>
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "PurchaseListItem",
  props: ["purchaseItem", "productItemName"],
  methods: {
    deletePurchase() {
      this.$store.dispatch("deletePurchase",
          {
            productName: this.productItemName,
            purchaseId: this.purchaseItem.id
          });
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
