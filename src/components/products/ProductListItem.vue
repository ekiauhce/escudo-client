<template>
    <v-list-item :to="'/products/' + product.name" two-line>
      <v-list-item-content>
        <v-list-item-title>
          <v-row no-gutters>
            <v-col>
              {{ product.name }}
            </v-col>
            <v-col class="text-right">
              <!-- TODO: add some info about product on the right of list item -->
              <!-- <strong v-if="lastPurchase">{{ lastPurchaseCostPerDay }}</strong>
              <strong v-else>0</strong>
              <small> ₽/day</small> -->
            </v-col>
          </v-row>
        </v-list-item-title>
        <!-- <v-list-item-subtitle>
          sdsds
        </v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  name: "ProductListItem",
  props: ["product"],
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
