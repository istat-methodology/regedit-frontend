<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.dispatch('coreui/toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.dispatch('coreui/toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="img/istat-logo.png" height="20" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom"
        add-menu-classes="dropdown-menu-right pt-0"
        v-if="isSupervisor || isAdmin"
      >
        <template #toggler>
          <CHeaderNavLink>
            <div class="c-header-nav-first">Impostazioni</div>
          </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
          <strong>Gestione</strong>
        </CDropdownHeader>
        <CDropdownItem>
          <router-link
            :to="{
              name: 'DugList'
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <span class="pl-1"
                ><arrow-right-icon class="pr-3" />Lista Dug</span
              >
            </a>
          </router-link>
        </CDropdownItem>
        <CDropdownItem>
          <router-link
            :to="{
              name: 'UserList'
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <span class="pl-1"
                ><arrow-right-icon class="pr-3" />Lista Utenti</span
              >
            </a>
          </router-link>
        </CDropdownItem>
      </CDropdown>
      <CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom"
        add-menu-classes="dropdown-menu-right pt-0"
        v-else
        ><template #toggler>
          <CHeaderNavLink>
            <div class="c-header-nav-first">Impostazioni</div>
          </CHeaderNavLink>
        </template>
        <CDropdownItem>
          <router-link
            :to="{
              name: 'UserPassChange'
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate">
              <span class="pl-1"
                ><arrow-right-icon class="pr-3" />Cambio Password</span
              >
            </a>
          </router-link>
        </CDropdownItem>
      </CDropdown>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <app-header-dropdown-account />
    </CHeaderNav>
    <CSubheader class="justify-content-between px-3">
      <!--CBreadcrumbRouter class="border-0 mb-0" /-->
      <app-header-breadcrumb></app-header-breadcrumb>
      <app-header-nav></app-header-nav>
    </CSubheader>
  </CHeader>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderDropdownAccnt from "./HeaderDropdownAccnt";
import BreadCrumb from "./BreadCrumb";
import HeaderNav from "./HeaderNav";

export default {
  name: "Header",
  computed: {
    ...mapGetters("auth", ["isSupervisor", "isAdmin", "isRevisor"])
  },
  components: {
    "app-header-dropdown-account": HeaderDropdownAccnt,
    "app-header-breadcrumb": BreadCrumb,
    "app-header-nav": HeaderNav
  }
};
</script>

<style scoped>
.c-header-nav {
  padding-left: 0.5rem;
}
.c-icon {
  margin-right: 0.4rem;
}
.b-0 > .material-design-icon__svg {
  bottom: 0;
}
.dropdown-item a {
  color: #4f5d73;
}
.dropdown-item a:active,
.dropdown-item a:hover,
.dropdown-item a:focus {
  color: #321fdb;
  text-decoration: none;
}
.dropdown-item.active,
.dropdown-item:active {
  text-decoration: none;
  color: #321fdb;
  background-color: #fff;
}
.dropdown-item:hover,
.dropdown-item:focus {
  text-decoration: none;
  color: #321fdb;
  background-color: #fff;
}
</style>
