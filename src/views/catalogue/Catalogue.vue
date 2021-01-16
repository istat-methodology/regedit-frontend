<template>
  <div v-if="isSupervisor">
    <app-landing-supervisor />
  </div>
  <div v-else-if="isReviewer">
    <app-landing-reviewer />
  </div>
  <div class="row" v-else>
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
</template>

<script>
import { Context } from "@/common";
import { mapGetters } from "vuex";
import Reviewer from "./landing/Reviewer";
import Supervisor from "./landing/Supervisor";

export default {
  name: "Catalogue",
  components: {
    "app-landing-reviewer": Reviewer,
    "app-landing-supervisor": Supervisor
  },
  computed: {
    ...mapGetters("auth", ["isReviewer", "isSupervisor"])
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>
