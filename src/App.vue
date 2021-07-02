<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" temporary app>
        <NavigationList />
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import NavigationList from "./components/NavigationList";

export default {
  name: 'App',
  components: {
    NavigationList
  },
  data: function () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters(["credentials"])
  },
  created() {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) this.$store.dispatch("setCredentials", credentials);
  },
  watch: {
    credentials() {
      if (this.credentials) this.$store.dispatch("getProductItems");
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
          .then(() => this.$router.push("/login"));
    }
  }
}
</script>

<style>
</style>
