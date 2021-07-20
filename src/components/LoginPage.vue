<template>
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col sm="8" md="6" lg="4">
        <v-card>
          <v-card-title>Login to Escudo</v-card-title>
          <v-card-text>
            <v-form
                @submit.prevent="login"
                v-model="valid"
                ref="form">
              <v-text-field
                  v-model="username"
                  :error-messages="usernameErrorMessages"
                  @input="clearUsernameErrorMessages"
                  placeholder="Username"/>
              <v-text-field
                  v-model="password"
                  :error-messages="passwordErrorMessages"
                  @input="clearPasswordErrorMessages"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"/>
              <v-btn class="mt-2" type="submit" color="secondary"
                     :loading="loading"
                     block rounded>Log in</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LoginPage",
  data: function () {
    return {
      valid: false,
      username: "",
      password: "",
      showPassword: false,
      usernameErrorMessages: [],
      passwordErrorMessages: []
    }
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("login",
          { username: this.username, password: this.password})
          .then(() => this.$router.push("/products"))
          .catch(error => {
            const msg = error.response.data.message;
            if (msg.toLowerCase().includes("password")) this.passwordErrorMessages.push(msg);
            else if (msg.toLowerCase().includes("username")) this.usernameErrorMessages.push(msg);
          });
    },
    clearUsernameErrorMessages() {
      this.usernameErrorMessages = [];
    },
    clearPasswordErrorMessages() {
      this.passwordErrorMessages = [];
    }
  }
}
</script>

<style scoped>

</style>
