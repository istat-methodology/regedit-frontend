<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <line-chart :chartData="chartData"> </line-chart>
          <button @click="fillData()">Randomize</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <CCardBody>
            <label>Utenti</label>
            <v-select
              v-if="users"
              label="name"
              :options="users"
              placeholder="Utenti"
              @input="changeUser"
            ></v-select>
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

export default {
  name: "Report",
  mixins: [pivotMixin],
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {},
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
    ...mapGetters("user", ["users"])
  },
  methods: {
    changeUser(value) {
      this.$store.dispatch("daily/findByUser", value.id);
      this.$store.dispatch("pivot/findByDate", 2, "2021-01-01", "2021-02-02");
    },
    fillData() {
      this.datacollection = {
        labels: this.getLabels(this.reportsByDate),
        datasets: [
          {
            label: "Revisionati",
            borderColor: "#2eb85c",
            backgroundColor: "transparent",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Validati",
            borderColor: "#e55353",
            backgroundColor: "transparent",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Sospesi",
            borderColor: "#f9b115",
            backgroundColor: "transparent",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  mounted() {
    this.fillData();
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.DailyReport);
    this.$store.dispatch("daily/findAll");
    this.$store.dispatch("user/findAll");
    this.$store.dispatch("pivot/findByDate", 2, "2021-01-01", "2021-02-02");
    this.fillData();
  }
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
