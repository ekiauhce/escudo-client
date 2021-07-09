<template>
  <v-row justify="center">
    <v-col sm="8" md="6" lg="4">
      <v-container class="px-2">
      <v-row v-if="productItem" class="mt-3">
        <PurchaseListItem v-for="purchaseItem in productItem.purchases" :key="purchaseItem.id"
                          :purchaseItem="purchaseItem" :productItemId="productItem.id"/>
      </v-row>
      </v-container>
      <v-divider class="mt-3"></v-divider>
      <v-sheet>
        <v-container>
          <v-row dense>
            <v-col>
              Average <abbr title="Cost per day">CPD</abbr>:
            </v-col>
            <v-col class="text-right">
              <strong>{{ averageCPD }}</strong> <small>₽/day</small>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              Average lifespan:
            </v-col>
            <v-col class="text-right">
              <strong>{{ averageLifespan }}</strong> <small>days</small>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-divider></v-divider>
      <v-form class="mt-4" @submit.prevent="addNewPurchase">
        <v-text-field v-model.number="price" placeholder="Enter purchase price" outlined dense/>
        <v-btn type="submit" color="primary" rounded block>Add</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>

import PurchaseListItem from "./PurchaseListItem";
import moment, {duration} from "moment";

export default {
  name: "PurchaseList",
  components: {PurchaseListItem},
  props: ["productName"],
  data: function () {
    return {
      price: ""
    };
  },
  methods: {
    addNewPurchase() {
      this.$store.dispatch("addNewPurchase",
          { productId: this.productItem.id, purchase: { price: this.price }});
    },
    calculateLifespan(p1, p2) { // in days
      const start = moment(p1.madeAt);
      const end = moment(p2.madeAt);
      return duration(end.diff(start))
          .asSeconds() / (60 * 60 * 24);
    }
  },
  computed: {
    productItem() {
      return this.$store.getters.productItemFromName(this.productName);
    },
    canComputeAverages() {
      if (!this.productItem) return false;
      const purchases = this.productItem.purchases;
      return !(!purchases || purchases.length < 2);
    },
    averageCPD() {
      if (!this.canComputeAverages) return 0;
      const purchases = this.productItem.purchases;
      let sum = 0;
      for (let i = 0; i < purchases.length - 1; i++) {
        sum += purchases[i].price / this.calculateLifespan(purchases[i], purchases[i + 1]);
      }
      return (sum / (purchases.length - 1)).toFixed(2);
    },
    averageLifespan() {
      if (!this.canComputeAverages) return 0;
      const purchases = this.productItem.purchases;
      let sum = 0;
      for (let i = 0; i < purchases.length - 1; i++) {
        sum += this.calculateLifespan(purchases[i], purchases[i + 1]);
      }
      return (sum / (purchases.length - 1)).toFixed(2);
    }
  }
}
</script>

<style scoped>


</style>
