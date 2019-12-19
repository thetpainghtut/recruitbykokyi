<template>
    <nav class="navbar bg-dark mb-5">
        <a class="navbar-brand" href="#">
          <img src="@/assets/logo.jpg" height="40" alt="">
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