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
          :to="{ name: 'Home' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isHome }"
          custom
          v-slot="{ href, navigate }"
        >
          <a :href="href" @click="navigate">
            <CIcon name="cil-home" class="c-sidebar-nav-icon" />Home
            <span class="badge badge-primary">Alpha</span>
          </a>
        </router-link>
      </li>
      <template v-if="isSupervisor">
        <li class="c-sidebar-nav-title">
          Report
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'TotalReport' }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isTotalReport }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-chart" class="c-sidebar-nav-icon" />Totali
            </a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'DailyReport' }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active': isDailyReport }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-chart" class="c-sidebar-nav-icon" />Giornaliero
            </a>
          </router-link>
        </li>
      </template>
      <template v-if="isReviewer || assignedId > 0">
        <li class="c-sidebar-nav-title">
          Indirizzi <small class="pl-1">{{ assignedName }}</small>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressList', params: { state: 1 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-primary': isAddressToRevise }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Da lavorare
              <span class="badge badge-primary"
                >{{ daLavorare }} / {{ total }}</span
              >
            </a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressList', params: { state: 2 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-success': isAddressRevised }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Lavorati
              <span class="badge badge-success"
                >{{ lavorati }} / {{ total }}</span
              >
            </a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressList', params: { state: 3 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-warning': isAddressSkip }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Sospesi
              <span class="badge badge-warning"
                >{{ sospesi }} / {{ total }}</span
              >
            </a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">
          Modifiche in blocco
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressBlock', params: { state: 1 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-primary': isBlock }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Indirizzi
              da Lavorare
              <span class="badge badge-primary"
                >{{ _selezionati }} / {{ daLavorare }}</span
              >
            </a>
          </router-link>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressBlock', params: { state: 3 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-warning': isBlockSuspended }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Indirizzi
              Sospesi
              <span class="badge badge-warning"
                >{{ _selezionatiSospesi }} / {{ sospesi }}</span
              >
            </a>
          </router-link>
        </li>
        <!--li class="c-sidebar-nav-title">
          Revisioni in blocco <small class="pl-1">{{ assignedName }}</small>
        </li>
        <li class="c-sidebar-nav-item">
          <router-link
            :to="{ name: 'AddressBlock', params: { state: 1 } }"
            class="c-sidebar-nav-link"
            :class="{ 'c-active c-active-primary': isBlock }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Da lavorare
              <span class="badge badge-primary"
                >{{ daLavorare }} / {{ total }}</span
              >
            </a>
          </router-link>
        </li-->
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
      isAddressSkip: "isAddressSkip",
      isBlock: "isBlock",
      isBlockSuspended: "isBlockSuspended"
    }),
    ...mapGetters("progress", ["reports"]),
    ...mapGetters("progress", ["selezionati"]),
    ...mapGetters("progress", ["selezionatiSospesi"]),
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
    },
    _selezionati() {
      return this.getSelezionati(this.selezionati);
    },
    _selezionatiSospesi() {
      return this.getSelezionati(this.selezionatiSospesi);
    }
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
.c-active-primary {
  border-left: 3px solid#321fdb;
}
.c-active-success {
  border-left: 3px solid#2eb85c;
}
.c-active-warning {
  border-left: 3px solid#f9b115;
}
</style>
