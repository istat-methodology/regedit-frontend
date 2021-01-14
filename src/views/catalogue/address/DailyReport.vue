<template>
  <div class="row">
    <!-- <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div> -->
    <div class="col-12">
      <div class="card fade-in">
        <template>
          <div>
            <bar-chart :chartdata="chartdata" :options="options"> </bar-chart>
            <button @click="fillData()">Randomize</button>
          </div>
        </template>
      </div>
    </div>
    <div class="col-12">
      <!--  <app-progress class="fade-in" /> -->
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
            <!-- <template #action="{item}">
              <td>
                <CButton
                  shape="square"
                  variant="outline"
                  size="sm"
                  :color="getStatoColor(item.stato, item.validazione)"
                  @click="handleEdit(item.progressivoIndirizzo)"
                  >{{ getStatoString(item.stato, item.validazione) }}</CButton
                >
              </td>
            </template>

            <template #no-items-view :addresses="{ addresses }">
              <div class="no-data" v-if="addresses && addresses.length == 0">
                Nessun dato disponibile
              </div>
              <div v-else><tile></tile></div>
            </template> -->
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/* import Progress from "@/components/Progress"; */
/* import addressMixin from "@/components/mixins/address.mixin"; */
//import LineChart from "@/components/mixins/LineChart";
import BarChart from "@/components/mixins/BarChart";

export default {
  name: "DailyReport",
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      chartdata: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },

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
  mounted() {
    this.loaded = false;
    try {
      /*  const { userlist } = await fetch('/api/userlist') */
      /* this.chartdata = this.localchartdata;
      this.options = this.localoptions; */
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    /* ...mapGetters("coreui", ["isLoading"]), */
    ...mapGetters("dailyReport", ["reports"])
  },
  methods: {
    fillData() {
      this.$children[0].renderChart(this.chartdata, this.options);
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
    /*  handleEdit(id) {
      this.$store.dispatch("address/setCurrentId", id);
      this.$router.push({
        name: "AddressEdit",
        params: { state: this.$route.params.state }
      });
    },
    load(state) {
      this.$store.dispatch("coreui/setContext", state);
      this.$store.dispatch("progress/findByUser");
      this.$store.dispatch("address/clear");
      this.$store.dispatch("address/findByUserAndState", state);
    } */
  },
  created() {
    this.$store.dispatch("dailyReport/findAll");
  }
  /*  beforeRouteUpdate(to, from, next) {
    this.load(to.params.state);
    next();
  },
  created() {
    this.load(this.$route.params.state);
  } */
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
