<template>
  <v-sheet outlined rounded>
    <div v-if="productItem.summary != null">
      <v-container>
        <v-row dense>
          <v-col>
            Average <abbr title="Cost per day">CPD</abbr>:
          </v-col>
          <v-col class="text-right">
              <strong>{{ productItem.summary.avgCpd.toFixed(2) }}</strong> <small>₽/day</small>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            Average lifespan:
          </v-col>
          <v-col class="text-right">
            <strong>{{ productItem.summary.avgLifespan.toFixed(2) }}</strong> <small>days</small>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-skeleton-loader v-else type="list-item-two-line"></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name: "PurchasesSummary",
  props: ["productItem"],
  created() {
    if (this.productItem.summary == null) {
        this.$store.dispatch("getPurchasesSummary", { productName: this.productItem.name });
    }
  }
}
</script>

<style scoped>

</style>
