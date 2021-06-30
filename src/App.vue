<template>
  <div id="app">
    <router-link :to="{ name: 'RegisterPage' }" replace>Register</router-link>
    <router-link :to="{ name: 'ProductList' }" replace>Products</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

body {
  font-family: 'Source Code Pro', monospace;
}

</style>
