<template>
  <div>
    <div class="row">
      <div class="col-12">
        <CCard>
          <CCardHeader
            >Totale indirizzi lavorati da ciascun revisore</CCardHeader
          >
          <CCardBody>
            <bar-chart :chartData="chartData" />
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context, Role } from "@/common";
import BarChart from "@/components/charts/BarChart";
import pivotMixin from "@/components/mixins/pivot.mixin";

export default {
  name: "TotalReport",
  mixins: [pivotMixin],
  components: {
    BarChart
  },
  computed: {
    ...mapGetters("pivot", ["reports"]),
    ...mapGetters("user", ["users"]),
    usersReport() {
      return this.users.map(user => {
        return {
          ...user,
          ...this.getPivot(this.reports, user)
        };
      });
    },
    chartData() {
      var data = {};
      data.labels = ["Da lavorare", "Validati", "Revisionati", "Sospesi"];
      data.datasets = [];
      this.usersReport.forEach(user => {
        data.datasets.push({
          label: user.email,
          backgroundColor: "rgba(46, 184, 92, 0.2)",
          borderColor: "#2eb85c",
          borderWidth: 2,
          data: [user.daLavorare, user.validati, user.revisionati, user.sospesi]
        });
      });
      return data;
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.TotalReport);
    this.$store.dispatch("pivot/findAll").then(() => {
      this.$store.dispatch("user/findByRole", Role.Reviewer);
    });
  }
};
</script>
