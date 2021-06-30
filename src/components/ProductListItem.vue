<template>
    <div class="d-flex justify-content-between align-items-center">
      <router-link :to="product.name" append> {{ product.name }} </router-link>
      <span><strong>0</strong> ₽/day</span>
    </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
}
</script>

<style scoped>

</style>
