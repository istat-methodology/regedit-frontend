<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { AuthStatus } from "@/common";
export default {
  name: "app",
  created() {
    //Manage browser refresh F5
    this.$store.dispatch("auth/reloadCredentials").then(res => {
      if (res.status === AuthStatus.TokenExpired) this.$router.push("/login");
    });
    //Clear messages
    this.$store.dispatch("message/clear");
  }
};
</script>
