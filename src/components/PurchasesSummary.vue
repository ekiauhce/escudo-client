<template>
  <v-sheet v-if="productItem">
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
</template>

<script>
import moment, {duration} from "moment";

export default {
  name: "PurchasesSummary",
  props: ["productItem"],
  methods: {
    calculateLifespan(p1, p2) { // in days
      const start = moment(p1.madeAt);
      const end = moment(p2.madeAt);
      return duration(end.diff(start)).asSeconds() / (60 * 60 * 24);
    }
  },
  computed: {
    canComputeAverages() {
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
