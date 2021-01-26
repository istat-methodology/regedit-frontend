<template>
  <div>
    <div class="row">
      <div class="col-12">
        <CCard>
          <CCardHeader>
            Filtri di ricerca
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-4">
                <v-select
                  v-if="users"
                  label="name"
                  :options="users"
                  placeholder="Utente"
                  @input="changeUser"
                ></v-select>
              </div>
              <div class="col-4">
                <datepicker
                  :value="date"
                  input-class="form-control"
                ></datepicker>
              </div>
              <div class="col-4">
                <datepicker
                  :value="date"
                  input-class="form-control"
                ></datepicker>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <line-chart :chartData="chartData"> </line-chart>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <CCardBody>
            <CDataTable
              :items="reports"
              :fields="fields"
              column-filter
              :items-per-page="10"
              sorter
              hover
              pagination
            >
            </CDataTable>
          </CCardBody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";
import LineChart from "@/components/charts/LineChart";
import pivotMixin from "@/components/mixins/pivot.mixin";
import Datepicker from "vuejs-datepicker";
export default {
  name: "Report",
  mixins: [pivotMixin],
  components: {
    LineChart,
    Datepicker
  },
  data() {
    return {
      date: new Date(2016, 9, 16),
      fields: [
        {
          key: "user",
          label: "Utente",
          _style: "width:10%;"
        },
        {
          key: "stato",
          label: "stato",
          _style: "min-width:25%;"
        },
        { key: "count", label: "Totali" },
        { key: "validazione", label: "Validati" },
        { key: "dataMod", label: "Data di lavorazione", _style: "width:10%;" }
      ]
    };
  },
  computed: {
    ...mapGetters("daily", ["reports"]),
    ...mapGetters("pivot", ["reportsByDate"]),
    ...mapGetters("user", ["users"]),
    chartData() {
      var chartData = {};
      if (this.reportsByDate) {
        chartData.labels = this.getLabels(this.reportsByDate);
        chartData.datasets = this.getDatasets(this.reportsByDate);
      }
      return chartData;
    }
  },
  methods: {
    changeUser(value) {
      this.$store.dispatch("daily/findByUser", value.id);
      this.$store.dispatch(
        "pivot/findByDate",
        value.id,
        "2021-01-01",
        "2021-02-02"
      );
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.DailyReport);
    this.$store.dispatch("daily/findAll");
    this.$store.dispatch("user/findAll");
    this.$store.dispatch("pivot/findByDate", null, "2021-01-01", "2021-02-02");
  }
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #fff;
  opacity: 1;
  margin-bottom: 1rem;
}
</style>
