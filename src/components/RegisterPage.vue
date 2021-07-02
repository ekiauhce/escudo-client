<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="register" class="col-md-4">
      <div>
        <label for="register-username" class="form-label">Username</label>
        <input v-model="username" id="register-username" type="text" class="form-control"/>
      </div>
      <div>
        <label for="register-password" class="form-label">Password</label>
        <input v-model="password" id="register-password" type="password" class="form-control"/>
      </div>
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data: function() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password
      });
    }
  }
}
</script>

<style scoped>

</style>
