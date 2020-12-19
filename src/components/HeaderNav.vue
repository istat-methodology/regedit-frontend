<template>
  <div class="c-subheader-nav mfe-2" v-if="!isHome">
    <a href=" https://www.google.it/maps" target="_blank" class="pr-3"
      >Google maps</a
    >
    <a
      href=" http://maldive:8080/egonweb/main.action"
      target="_blank"
      class="pr-2"
      >Egon</a
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["isHome"])
  },
  watch: {
    $route(to) {
      if (to.path == "/metadata") {
        this.$store.dispatch("coreui/clearContext");
      }
    }
  }
};
</script>
