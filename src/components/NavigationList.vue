<template>
  <v-list nav dense>
    <v-list-item to="/products" v-if="this.$store.getters.credentials">
      <v-list-item-icon>
        <v-icon>mdi-clipboard-text</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Products</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/login" v-if="!this.$store.getters.credentials">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/register" v-if="!this.$store.getters.credentials">
      <v-list-item-icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Register</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="logout" v-if="this.$store.getters.credentials">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavigationList",
  methods: {
    logout() {
      this.$store.dispatch("logout")
          .then(() => this.$router.push("/login"));
    }
  }
}
</script>

<style scoped>

</style>
