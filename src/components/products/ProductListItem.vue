<template>
    <v-list-item :to="'/products/' + product.name" two-line>
      <v-list-item-content>
        <v-list-item-title>
          <v-row no-gutters>
            <v-col>
              {{ product.name }}
            </v-col>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle v-if="product.latestPurchaseMadeAt">
          Latest purchase: {{ latestPurchaseMadeAtAgo() }} 
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
import moment from 'moment'
export default {
  name: "ProductListItem",
  props: ["product"],
  data() {
    return {
      now: moment()
    }
  },
  created() {
    setInterval(() => this.now = moment(), 1000);
  },
  methods: {
    latestPurchaseMadeAtAgo() {
      return moment(this.product.latestPurchaseMadeAt).from(this.now);
    }
  }
}
</script>

<style scoped>

</style>
