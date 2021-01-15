<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <bar-chart :chartData="chartData"> </bar-chart>
          <button @click="fillData()">Randomize</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card fade-in">
          <CCardBody>
            <label>Utenti</label>
            <v-select :options="userNames" placeholder="Utenti"></v-select>
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
import BarChart from "@/components/charts/BarChart";

export default {
  name: "DailyReport",
  components: {
    BarChart
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
    /* ...mapGetters("coreui", ["isLoading"]), */
    ...mapGetters("dailyReport", ["reports"]),
    ...mapGetters("userList", ["users"]),
    userNames() {
      return this.users.map(user => {
        return user.name;
      });
    }
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: ["11 Gennaio", "12 Gennaio", "13 Gennaio", "14 Gennaio"],
        datasets: [
          {
            label: "Validati",
            backgroundColor: "#2eb85c",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Revisionati",
            backgroundColor: "#e55353",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Sospesi",
            backgroundColor: "#f9b115",
            data: [
              this.getRandomInt(),
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
    this.$store.dispatch("userList/findAll");
    this.$store.dispatch("dailyReport/findAll");
  }
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
