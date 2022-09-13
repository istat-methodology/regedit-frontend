<template>
  <div class="c-app">
    <app-sidebar v-if="!isToponimi"></app-sidebar>
    <app-sidebar-toponimi v-else></app-sidebar-toponimi>
    <CWrapper>
      <app-toast></app-toast>
      <app-header />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <app-footer />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import SidebarToponimi from "@/components/SidebarToponimi";
import Toast from "@/components/Toast";
export default {
  name: "App",
  computed: {
    ...mapGetters("customswitch", ["isToponimi"])
    /* toggleToponimi() {
      return this.$store.dispatch("customswitch/setToponimi", !this.isToponimi);
    } */
  },
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-sidebar": Sidebar,
    "app-sidebar-toponimi": SidebarToponimi,
    "app-toast": Toast
  },
  created() {
    this.$store.dispatch("coreui/clearContext");
  }
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "../assets/scss/style";

//Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
