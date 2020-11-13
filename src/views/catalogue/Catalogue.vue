<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Service catalogue</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of services available in the catalogue.
          The statistical services are classified according to GSBPM standard.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'BusinessServiceList' }"
              ><span>Go to service catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Process catalogue
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of processes available in the
          catalogue. The processes allow to execute the algorithms offered by
          the statistical services.
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'BusinessProcessList' }"
              ><span>Go to process catalogue <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">Work session</header>
        <div class="card-body">
          This section contains the work sessions created by authenticated user.
          To access your work sessions you should be logged into the system.
          <p class="section-link section-link-disabled">
            <span>Go to work session section <chevron-right-icon /></span>
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
