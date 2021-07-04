<template>
  <v-row justify="center">
    <v-col sm="8" md="6" lg="3">
      <v-card class="mt-10">
        <v-card-title>Create new account</v-card-title>
        <v-card-text>
          <v-form
              @submit.prevent="register"
              v-model="valid"
              ref="form">
            <v-text-field
                v-model="username"
                :rules="usernameRules"
                @blur="resetValidation"
                placeholder="Username"/>
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                @blur="resetValidation"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"/>
            <v-btn class="mt-2"
                   type="submit" color="primary" block rounded>Register</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RegisterPage",
  data: function () {
    return {
      valid: false,
      username: "",
      password: "",
      showPassword: false,
      takenUsernames: [],
      usernameRules: [
          v => !!v.trim() || "Username can't be empty!",
          v => !this.takenUsernames.includes(v) || "This username already exists!"
      ],
      passwordRules: [
          v => v.length >= 8 || "Password must be at least 8 characters long!"
      ]
    }
  },
  methods: {
    register() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("register", {
        username: this.username,
        password: this.password })
      .catch(() => {
        this.takenUsernames.push(this.username);
        this.$refs.form.validate();
      });
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
}
</script>

<style scoped>

</style>
