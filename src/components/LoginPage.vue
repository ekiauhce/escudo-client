<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="login" class="col-md-4">
      <div>
        <label for="login-username" class="form-label">Username</label>
        <input v-model="username" id="login-username" type="text" class="form-control"/>
      </div>
      <div>
        <label for="login-password" class="form-label">Password</label>
        <input v-model="password" id="login-password" type="password" class="form-control"/>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login",
          { username: this.username, password: this.password});
    }
  }
}
</script>

<style scoped>

</style>
