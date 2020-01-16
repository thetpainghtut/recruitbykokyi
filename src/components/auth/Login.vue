<template>
  <div id="login" class="container-fluid">
      <div class="row pt-5">
        <div class="col-md-12 text-center">
          <img src="@/assets/logo.jpg" height="100">
        </div>
      </div>
      <div v-if="isLoggedIn" class="row pt-5">
        <div class="col text-center">
          <p class="text-white">You are already authenticated.</p>
          <a href="/" class="btn btn-primary btn-sm text-center">Go Back</a>
        </div>
      </div>
      <div v-else>
        <div class="row pt-5">
          <div class="col-lg-6 mx-auto">
            <div id="status">
              <div v-if="status == 'loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div v-else class="pt-5 text-center">
                <span class="alert text-white">{{status}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-lg-4 mx-auto">
            <form @submit.prevent="login(user)">
              <div class="form-group">
                <label>Email</label>
                <input
                type="text"
                class="form-control form-control-sm"
                name="login"
                placeholder="Enter Email"
                v-model="user.username">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                type="password"
                class="form-control form-control-sm"
                name="password"
                placeholder="Enter Password"
                v-model="user.password">
              </div>
              <div class="form-group text-center">
                <input type="submit" class="btn btn-dark btn-sm w-25 mt-3" value="Log In">
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",

      }
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },

    status() {
      return this.$store.getters["auth/authStatus"];
    }
  },

  methods: {
    login(user) {
      this.$store.dispatch("auth/login", user)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
  #login {
    min-height: 100vh;
    background: cornflowerblue;
  }
</style>