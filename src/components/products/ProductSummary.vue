<template>
  <v-sheet outlined rounded>
    <v-container>
      <v-row dense>
        <v-col>
          Average <abbr title="Cost per day">CPD</abbr>:
        </v-col>
        <v-col class="text-right">
          <strong>{{ productItem.summary.avgCPD.toFixed(2) }}</strong> <small>₽/day</small>
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
  </v-sheet>
</template>

<script>
export default {
  name: "ProductSummary",
  props: ["productItem"]
}
</script>

<style scoped>

</style>
