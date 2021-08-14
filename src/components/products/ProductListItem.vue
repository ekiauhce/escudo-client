<template>
    <v-list-item :to="'/products/' + product.name" two-line>
      <v-list-item-content>
        <v-list-item-title>
          <v-container class="pa-0">
            <v-row dense>
              <v-col>
                {{ product.name }}
              </v-col>
              <v-col class="text-right">
                <strong v-if="lastPurchase">{{ lastPurchaseCostPerDay }}</strong>
                <strong v-else>0</strong>
                <small> ₽/day</small>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item-title>
        <v-list-item-subtitle v-if="lastPurchase">
          {{ lastPurchaseMadeAtMomentFormatted }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";
import moment, {duration} from "moment";

export default {
  name: "ProductListItem",
  props: ["product"],
  data() {
    return {
      lastPurchase: null,
      lastPurchaseMadeAtMoment: null,
      now: moment()
    }
  },
  created() {
    this.lastPurchase = this.lastPurchaseByProductId(this.product.id);
    if (this.lastPurchase) {
      this.lastPurchaseMadeAtMoment = moment(this.lastPurchase.madeAt);
    }
  },
  mounted() {
    setInterval(() => this.now = moment(), 1000);
  },
  computed: {
    ...mapGetters([
        "lastPurchaseByProductId"
    ]),
    lastPurchaseMadeAtMomentFormatted() {
      return this.lastPurchaseMadeAtMoment.from(this.now);
    },
    lastPurchaseCostPerDay() {
      const price = this.lastPurchase.price;
      const days = duration(this.now.diff(this.lastPurchaseMadeAtMoment))
          .asSeconds() / (60 * 60 * 24);

      return (price / days).toFixed(2);
    }
  }
}
</script>

<style scoped>

</style>
