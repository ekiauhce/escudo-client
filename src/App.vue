<template>
  <div id="app">
    <v-app>
      <v-app-bar color="primary" dark app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" temporary app>
        <NavigationList />
      </v-navigation-drawer>
      <v-main>
          <router-view/>
      </v-main>
      <v-footer color="transparent" class="mt-5">
        <v-row no-gutters>
          <v-col cols="12" class="pb-3">
            <v-divider></v-divider>
          </v-col>
          <v-col class="text-center text--secondary" cols="12">
            Made with ♥ by ekiauhce
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
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
  created() {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) {
      this.$store.dispatch("setCredentials", credentials); 
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
