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
                  label="email"
                  :options="users"
                  placeholder="Tutti gli utenti"
                  @input="changeUser"
                ></v-select>
              </div>
              <div class="col-4">
                <datepicker
                  name="startDay"
                  v-model="start"
                  lang="en"
                  @selected="changedStartDate()"
                  input-class="form-control"
                ></datepicker>
              </div>
              <div class="col-4">
                <datepicker
                  name="endDay"
                  v-model="end"
                  lang="en"
                  @selected="changedEndDate()"
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
          <line-chart v-if="chartData" :chartData="chartData"> </line-chart>
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
      selectedUser: null,
      start: null,
      end: null,
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
    ...mapGetters("pivot", ["reportsByDateTotal"]),
    ...mapGetters("user", ["users"]),
    chartData() {
      var chartData = {};
      if (this.reportsByDateTotal && this.selectedUser == null) {
        chartData.labels = this.getLabels(this.reportsByDateTotal);
        chartData.datasets = this.getDatasets(this.reportsByDateTotal);
      }
      if (this.reportsByDate && this.selectedUser != null) {
        chartData.labels = this.getLabels(this.reportsByDate);
        chartData.datasets = this.getDatasets(this.reportsByDate);
      }
      return chartData;
    }
  },
  methods: {
    changeUser(value) {
      var startdate =
        this.start.getFullYear() +
        "-" +
        (this.start.getMonth() + 1) +
        "-" +
        this.start.getDate();
      var enddate =
        this.end.getFullYear() +
        "-" +
        (this.end.getMonth() + 1) +
        "-" +
        this.end.getDate();
      if (value != null) {
        this.selectedUser = value.id;
        this.$store.dispatch("daily/findByUser", value.id);
        this.$store.dispatch("pivot/findByDate", value.id, startdate, enddate);
      } else {
        this.$store.dispatch("daily/findAll");
        this.$store.dispatch("pivot/findByDateTotal", startdate, enddate);
      }
    },
    changedStartDate() {
      if (this.start) {
        var startdate =
          this.start.getFullYear() +
          "-" +
          (this.start.getMonth() + 1) +
          "-" +
          this.start.getDate();
        var enddate =
          this.end.getFullYear() +
          "-" +
          (this.end.getMonth() + 1) +
          "-" +
          this.end.getDate();
        if (this.selectedUser != null) {
          this.$store.dispatch("daily/findByUser", this.selectedUser);
          this.$store.dispatch(
            "pivot/findByDate",
            this.selectedUser,
            startdate,
            enddate
          );
        } else {
          this.$store.dispatch("daily/findAll");
          this.$store.dispatch("pivot/findByDateTotal", startdate, enddate);
        }
      }
    },
    changedEndDate() {
      if (this.end) {
        var startdate =
          this.start.getFullYear() +
          "-" +
          (this.start.getMonth() + 1) +
          "-" +
          this.start.getDate();
        var enddate =
          this.end.getFullYear() +
          "-" +
          (this.end.getMonth() + 1) +
          "-" +
          this.end.getDate();
        if (this.selectedUser != null) {
          this.$store.dispatch("daily/findByUser", this.selectedUser);
          this.$store.dispatch(
            "pivot/findByDate",
            this.selectedUser,
            startdate,
            enddate
          );
        } else {
          this.$store.dispatch("daily/findAll");
          this.$store.dispatch("pivot/findByDateTotal", startdate, enddate);
        }
      }
    }
  },
  created() {
    this.start = new Date();
    this.end = new Date();
    this.start.setDate("1");
    var startdate =
      this.start.getFullYear() +
      "-" +
      (this.start.getMonth() + 1) +
      "-" +
      this.start.getDate();
    var enddate =
      this.end.getFullYear() +
      "-" +
      (this.end.getMonth() + 1) +
      "-" +
      this.end.getDate();

    this.$store.dispatch("coreui/setContext", Context.DailyReport);
    this.$store.dispatch("daily/findAll");
    this.$store.dispatch("user/findAll");
    this.$store.dispatch("pivot/findByDateTotal", startdate, enddate);
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
