<template>
  <div>
    <div class="row">
      <div class="col-12">
        <CCard>
          <CCardHeader>Totale indirizzi lavorati</CCardHeader>
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
import { Context } from "@/common";
import BarChart from "@/components/charts/BarChart";
import chartMixin from "@/components/mixins/chart.mixin";

export default {
  name: "TotalReport",
  mixins: [chartMixin],
  components: {
    BarChart
  },
  computed: {
    ...mapGetters("pivot", ["reports"]),
    chartData() {
      var chartData = {};
      chartData.labels = ["Da lavorare", "Validati", "Revisionati", "Sospesi"];
      chartData.datasets = [];
      this.reports.forEach(report => {
        const color = this.getColor();
        chartData.datasets.push({
          label: report.user,
          backgroundColor: color.background,
          borderColor: color.border,
          borderWidth: 2,
          data: [
            report.dalavorare,
            report.validati,
            report.revisionati,
            report.sospesi
          ]
        });
      });
      this.clearColor();
      return chartData;
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.TotalReport);
    this.$store.dispatch("pivot/findAll");
  }
};
</script>
