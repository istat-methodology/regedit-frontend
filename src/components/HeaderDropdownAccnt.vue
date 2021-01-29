<template>
  <div v-if="isAuthenticated">
    <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
    >
      <template #toggler>
        <CHeaderNavLink>
          <div class="c-avatar">
            <img src="img/avatars/user.png" class="c-avatar-img" />
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownHeader tag="div" class="text-center" color="light">
        Logged: {{ loggedUser.sub }}
      </CDropdownHeader>
      <CDropdownItem>
        <user-icon /><span class="pl-2"> Profile</span>
      </CDropdownItem>
      <CDropdownItem>
        <settings-icon /><span class="pl-2"> Settings</span></CDropdownItem
      >
      <CDropdownDivider />
      <CDropdownItem @click="logout">
        <logout-icon /><span class="pl-2">Logout</span>
      </CDropdownItem>
    </CDropdown>
  </div>
  <div v-else>
    <CHeaderNavLink>
      <router-link custom v-slot="{ href, navigate }" to="/login">
        <a :href="href" @click="navigate"
          ><span><user-icon /> Login</span></a
        >
      </router-link>
    </CHeaderNavLink>
  </div>
</template>

<script>
import { CDropdownDivider } from "@coreui/vue";
import { mapGetters } from "vuex";

export default {
  name: "HeaderDropdownAccount",
  components: {
    CDropdownDivider
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "loggedUser"])
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        if (this.$router.currentRoute.path != "/catalogue") {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
a {
  color: #4f5d73;
}
</style>
