<template>
  <ol class="breadcrumb border-0 mb-0">
    <li
      role="presentation"
      class="breadcrumb-item"
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.path"
    >
      <template v-if="index < breadcrumbs.length - 1">
        <router-link tag="a" :to="breadcrumb.to">{{
          upperCaseFirst(breadcrumb.path)
        }}</router-link>
      </template>
      <template v-else>{{ upperCaseFirst(breadcrumb.path) }}</template>
    </li>
  </ol>
</template>

<script>
import breadcrumbMixin from "@/components/mixins/breadcrumb.mixin";

export default {
  mixins: [breadcrumbMixin],
  data() {
    return {
      breadcrumbs: []
    };
  },
  methods: {
    upperCaseFirst(str) {
      return str.replace(/^\w/, c => c.toUpperCase());
    }
  },
  watch: {
    $route() {
      this.breadcrumbs = this.getBreadcrumbs(this.$route);
    }
  },
  created() {
    this.breadcrumbs = this.getBreadcrumbs(this.$route);
  }
};
</script>
