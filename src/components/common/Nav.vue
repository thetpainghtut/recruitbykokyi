<template>
    <nav class="navbar bg-dark">
        <a class="navbar-brand" href="#">
          <img src="@/assets/logo.jpg" height="30" alt="">
        </a>
        <button class="btn btn-primary btn-sm mr-2" @click="logout">Logout</button>
      </nav>
</template>
<script>
export default {
  data(){
    return {

    }
  },

  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
  }
}
</script>
<style scoped>
  .navbar {
    min-height: 50px;
  }
</style>