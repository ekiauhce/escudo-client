<template>
    <v-list-item two-line :to="'/products/' + product.name">
      <v-list-item-content>
        <v-list-item-title class="d-flex justify-space-between">
          <div>{{ product.name }}</div>
          <div><strong>14.3</strong> <small>₽/day</small></div>
        </v-list-item-title>
        <v-list-item-subtitle>Two days ago</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
}
</script>

<style scoped>

</style>
