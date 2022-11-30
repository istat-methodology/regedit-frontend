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
                  v-model="startDay"
                  lang="it"
                  @input="changedStartDate()"
                  input-class="form-control"
                ></datepicker>
              </div>
              <div class="col-4">
                <datepicker
                  name="endDay"
                  v-model="endDay"
                  lang="it"
                  @input="changedEndDate()"
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
    <!-- <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <CCardBody>
            <CDataTable
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
    </div> -->
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
      startDay: null,
      startdate: "",
      enddate: "",
      endDay: null,
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
      var filters;
      this.startdate =
        this.startDay.getFullYear() +
        "-" +
        (this.startDay.getMonth() + 1) +
        "-" +
        this.startDay.getDate();
      this.enddate =
        this.endDay.getFullYear() +
        "-" +
        (this.endDay.getMonth() + 1) +
        "-" +
        this.endDay.getDate();

      if (value != null) {
        filters = { id: value.id, start: this.startdate, end: this.enddate };
        this.selectedUser = value.id;
        // this.$store.dispatch("daily/findByUser", value.id);
        this.$store.dispatch(
          "pivot/findByDate",
          filters
          /*  value.id,
          this.startdate,
          this.enddate */
        );
      } else {
        // this.$store.dispatch("daily/findAll");
        filters = { id: null, start: this.startdate, end: this.enddate };
        this.$store.dispatch(
          "pivot/findByDateTotal",
          filters
          /* this.startdate,
          this.enddate */
        );
      }
    },
    changedStartDate() {
      var filters;
      this.startdate =
        this.startDay.getFullYear() +
        "-" +
        (this.startDay.getMonth() + 1) +
        "-" +
        this.startDay.getDate();
      this.enddate =
        this.endDay.getFullYear() +
        "-" +
        (this.endDay.getMonth() + 1) +
        "-" +
        this.endDay.getDate();
      filters = {
        id: this.selectedUser,
        start: this.startdate,
        end: this.enddate
      };
      if (this.startDay) {
        if (this.selectedUser != null) {
          //  this.$store.dispatch("daily/findByUser", this.selectedUser);
          this.$store.dispatch(
            "pivot/findByDate",
            filters
            /* this.selectedUser,
            this.startdate,
            this.enddate */
          );
        } else {
          // this.$store.dispatch("daily/findAll");
          this.$store.dispatch(
            "pivot/findByDateTotal",
            filters
            /* this.startdate,
            this.enddate */
          );
        }
      }
    },
    changedEndDate() {
      var filters;
      this.startdate =
        this.startDay.getFullYear() +
        "-" +
        (this.startDay.getMonth() + 1) +
        "-" +
        this.startDay.getDate();
      this.enddate =
        this.endDay.getFullYear() +
        "-" +
        (this.endDay.getMonth() + 1) +
        "-" +
        this.endDay.getDate();
      filters = {
        id: this.selectedUser,
        start: this.startdate,
        end: this.enddate
      };
      if (this.endDay) {
        if (this.selectedUser != null) {
          // this.$store.dispatch("daily/findByUser", this.selectedUser);
          this.$store.dispatch(
            "pivot/findByDate",
            filters
            /*  this.selectedUser,
            this.startdate,
            this.enddate */
          );
        } else {
          //  this.$store.dispatch("daily/findAll");
          this.$store.dispatch(
            "pivot/findByDateTotal",
            filters
            /*  this.startdate,
            this.enddate */
          );
        }
      }
    }
  },
  created() {
    var payload;
    this.startDay = new Date();
    this.endDay = new Date();
    this.startDay.setDate("1");
    this.startdate =
      this.startDay.getFullYear() +
      "-" +
      (this.startDay.getMonth() + 1) +
      "-" +
      this.startDay.getDate();
    this.enddate =
      this.endDay.getFullYear() +
      "-" +
      (this.endDay.getMonth() + 1) +
      "-" +
      this.endDay.getDate();
    payload = {
      id: this.selectedUser,
      start: this.startdate,
      end: this.enddate
    };

    this.$store.dispatch("coreui/setContext", Context.DailyReport);
    // this.$store.dispatch("daily/findAll");
    //this.$store.dispatch("user/findAll");
    this.$store.dispatch("user/findAllUsers");
    this.$store.dispatch("pivot/findByDateTotal", payload);
    /* this.$store.dispatch("pivot/findByDateTotal", this.startdate, this.enddate); */
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
