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
                  name="start"
                  v-if="start"
                  :value="start"
                  @selected="changedStartDate()"
                  input-class="form-control"
                ></datepicker>
              </div>
              <div class="col-4">
                <datepicker
                  name="end"
                  v-if="end"
                  :value="end"
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
      today: null,
      firstofmonth: null,
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
      if (value != null) {
        this.selectedUser = value.id;
        this.$store.dispatch("daily/findByUser", value.id);
        this.$store.dispatch(
          "pivot/findByDate",
          value.id,
          this.firstofmonth,
          this.today
        );
      } else {
        this.$store.dispatch("daily/findAll");
        this.$store.dispatch(
          "pivot/findByDate",
          null,
          this.firstofmonth,
          this.today
        );
      }
    },
    changedStartDate() {
      this.today =
        this.start.getFullYear() +
        "-" +
        (this.start.getMonth() + 1) +
        "-" +
        this.start.getDate();
      this.firstofmonth =
        this.end.getFullYear() +
        "-" +
        (this.end.getMonth() + 1) +
        "-" +
        this.end.getDate();
      this.$store.dispatch("daily/findByUser", this.selectedUser);
      this.$store.dispatch(
        "pivot/findByDate",
        this.selectedUser,
        this.firstofmonth,
        this.today
      );
    },
    changedEndDate() {
      this.today =
        this.start.getFullYear() +
        "-" +
        (this.start.getMonth() + 1) +
        "-" +
        this.start.getDate();
      this.firstofmonth =
        this.end.getFullYear() +
        "-" +
        (this.end.getMonth() + 1) +
        "-" +
        this.end.getDate();
      this.$store.dispatch("daily/findByUser", this.selectedUser);
      this.$store.dispatch(
        "pivot/findByDate",
        this.selectedUser,
        this.firstofmonth,
        this.today
      );
    }
  },
  created() {
    this.start = new Date();
    this.end = new Date();
    this.start.setDate("1");
    this.today =
      this.start.getFullYear() +
      "-" +
      (this.start.getMonth() + 1) +
      "-" +
      this.start.getDate();
    this.firstofmonth =
      this.end.getFullYear() +
      "-" +
      (this.end.getMonth() + 1) +
      "-" +
      this.end.getDate();

    this.$store.dispatch("coreui/setContext", Context.DailyReport);
    this.$store.dispatch("daily/findAll");
    this.$store.dispatch("user/findAll");
    this.$store.dispatch(
      "pivot/findByDate",
      null,
      this.firstofmonth,
      this.today
    );
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
