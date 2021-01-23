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
      <template v-if="isSupervisor">
        <li class="c-sidebar-nav-title">
          Report
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'TotalReport' }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isTotalReport }"
          >
            <CIcon name="cil-chart" class="c-sidebar-nav-icon" />Totali
          </router-link>
        </li>
      </template>
      <template v-if="isReviewer || assignedId > 0">
        <li class="c-sidebar-nav-title">
          Indirizzi <small class="pl-1">{{ assignedName }}</small>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'AddressList', params: { state: 1 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isAddressToRevise }"
          >
            <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Da lavorare
            <span class="badge badge-primary"
              >{{ daLavorare }} / {{ total }}</span
            >
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            tag="a"
            :to="{ name: 'AddressList', params: { state: 2 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isAddressRevised }"
          >
            <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Lavorati
            <span class="badge badge-success"
              >{{ lavorati }} / {{ total }}</span
            >
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
            <span class="badge badge-warning">{{ sospesi }} / {{ total }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </CSidebar>
</template>
<script>
import { mapGetters } from "vuex";
import progressMixin from "@/components/mixins/progress.mixin";

export default {
  name: "Sidebar",
  mixins: [progressMixin],
  computed: {
    ...mapGetters("auth", ["isReviewer", "isSupervisor"]),
    ...mapGetters("address", ["assignedId", "assignedName"]),
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize",
      isHome: "isHome",
      isDailyReport: "isDailyReport",
      isTotalReport: "isTotalReport",
      isAddressToRevise: "isAddressToRevise",
      isAddressRevised: "isAddressRevised",
      isAddressSkip: "isAddressSkip"
    }),
    ...mapGetters("progress", ["reports"]),
    total() {
      return this.getTotal(this.reports);
    },
    daLavorare() {
      return this.getDaLavorare(this.reports);
    },
    lavorati() {
      return this.getValidati(this.reports) + this.getRevisionati(this.reports);
    },
    sospesi() {
      return this.getSospesi(this.reports);
    }
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
</style>
