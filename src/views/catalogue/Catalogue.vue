<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Service catalogue</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of addresses available in the
          catalogue.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'AddressList' }"
              ><span>Go to Address catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Context } from "@/common";

export default {
  name: "Catalogue",
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
