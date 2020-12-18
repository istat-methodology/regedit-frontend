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
      <li class="c-sidebar-nav-title">Catalogo</li>
      <li class="c-sidebar-nav-item" v-if="isAuthenticated">
        <router-link
          tag="a"
          :to="{ name: 'AddressList', params: { state: 1 } }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isAddress }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Indirizzi da
          revisionare
        </router-link>
      </li>
      <li class="c-sidebar-nav-item" v-if="isAuthenticated">
        <router-link
          tag="a"
          :to="{ name: 'AddressList', params: { state: 2 } }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isAddress }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Indirizzi
          revisionati
        </router-link>
      </li>
      <li class="c-sidebar-nav-item" v-if="isAuthenticated">
        <router-link
          tag="a"
          :to="{ name: 'AddressList', params: { state: 3 } }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isAddress }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Indirizzi
          sospesi
        </router-link>
      </li>
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
      isAddress: "isAddress"
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
