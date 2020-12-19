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
      <span class="brand">RegEdit</span>
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
      <template v-if="isAuthenticated">
        <li class="c-sidebar-nav-title">Indirizzi</li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'AddressList', params: { state: 1 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isAddressToRevise }"
          >
            <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Da
            revisionare
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'AddressList', params: { state: 2 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isAddressRevised }"
          >
            <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Revisionati
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'AddressList', params: { state: 3 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isAddressSkip }"
          >
            <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Sospesi
          </router-link>
        </li>
      </template>
    </ul>
  </CSidebar>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize",
      isHome: "isHome",
      isAddressToRevise: "isAddressToRevise",
      isAddressRevised: "isAddressRevised",
      isAddressSkip: "isAddressSkip"
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
