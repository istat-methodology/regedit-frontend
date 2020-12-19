<template>
  <div class="row">
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi da revisionare</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi da
          revisionare.
          <p class="section-link" v-if="isAuthenticated">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 1 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi revisionati</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi revisionati.
          <p class="section-link" v-if="isAuthenticated">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 2 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi sospesi</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi sospesi.
          <p class="section-link" v-if="isAuthenticated">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 3 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Context } from "@/common";
import { mapGetters } from "vuex";

export default {
  name: "Catalogue",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>

<style scoped>
.material-design-icon > .material-design-icon__svg {
  bottom: -0.17rem;
}
</style>
