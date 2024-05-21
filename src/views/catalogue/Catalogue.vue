<template>
  <div v-if="isSupervisor && (isToponimi === false || isToponimi === 'false')">
    <app-landing-supervisor />
  </div>
  <div
    v-else-if="isReviewer && (isToponimi === false || isToponimi === 'false')"
  >
    <app-landing-reviewer />
  </div>
  <div
    v-else-if="isSupervisor && (isToponimi === true || isToponimi === 'true')"
  >
    <app-landing-supervisor-top />
  </div>
  <div v-else-if="isReviewer && (isToponimi === true || isToponimi === 'true')">
    <app-landing-reviewer-top />
  </div>
  <div class="row" v-else-if="isToponimi === false">
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi da lavorare</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi da lavorare.
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi lavorati</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi lavorati.
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi sospesi</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi sospesi.
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-else-if="isToponimi === true">
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Toponimi da lavorare</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista dei Toponimi da lavorare.
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Toponimi lavorati</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista dei Toponimi lavorati.
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Toponimi sospesi</span>
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista dei Toponimi sospesi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Context } from "@/common";
import { mapGetters } from "vuex";
import Reviewer from "./landing/Reviewer";
import Supervisor from "./landing/Supervisor";
import ReviewerTop from "./landing/ReviewerTop";
import SupervisorTop from "./landing/SupervisorTop";

export default {
  name: "Catalogue",
  components: {
    "app-landing-reviewer": Reviewer,
    "app-landing-supervisor": Supervisor,
    "app-landing-reviewer-top": ReviewerTop,
    "app-landing-supervisor-top": SupervisorTop
  },
  computed: {
    ...mapGetters("auth", ["isReviewer", "isSupervisor"]),
    ...mapGetters("customswitch", ["isToponimi"]),
    ...mapGetters("elencoProvinceScript", ["provinceScript"])
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>
