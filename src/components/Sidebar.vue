<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="
      value => $store.commit('coreui/set', ['sidebarShow', 'responsive'])
    "
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon name="cil-terminal" size="lg"></CIcon>
      <span class="brand">IS2 Workbench</span>
    </CSidebarBrand>

    <ul class="c-sidebar-nav h-100 ps" style="position: relative;">
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'Home' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isHome }"
        >
          <CIcon name="cil-home" class="c-sidebar-nav-icon" />Home
          <span class="badge badge-primary">Alpha</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-title">Catalogue</li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'BusinessServiceList' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isService }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Service
        </router-link>
      </li>
    </ul>
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize",
      isHome: "isHome",
      isService: "isService",
      isProcess: "isProcess",
      isWorkSession: "isWorkSession"
    })
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
</style>
