<template>
  <ol class="breadcrumb border-0 mb-0">
    <li
      role="presentation"
      class="breadcrumb-item"
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.path"
    >
      <router-link
        v-if="index < breadcrumbs.length - 1"
        tag="a"
        :to="breadcrumb.to"
        >{{ upperCaseFirst(breadcrumb.path) }}</router-link
      >
      <template v-else>{{ upperCaseFirst(breadcrumb.path) }}</template>
    </li>
  </ol>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["breadcrumbs"])
  },
  methods: {
    upperCaseFirst(str) {
      return str.replace(/^\w/, c => c.toUpperCase());
    }
  },
  watch: {
    $route() {
      this.$store.dispatch("coreui/createBreadcrumbs", this.$route);
    }
  },
  created() {
    //page reload
    this.$store.dispatch("coreui/createBreadcrumbs", this.$route);
  }
};
</script>

<style></style>
