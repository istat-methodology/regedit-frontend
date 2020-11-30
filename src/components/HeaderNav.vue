<template>
  <div class="c-subheader-nav mfe-2" v-if="isAddress">
    <router-link
      tag="a"
      to="/catalogue/processstep"
      class="c-subheader-nav-link"
    >
      <gsim-icon />
      <span class="header-link icon-span">Gsim concepts</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["isAddress"])
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
