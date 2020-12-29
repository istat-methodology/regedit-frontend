<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <app-progress class="fade-in" />
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="addresses"
            :fields="fields"
            column-filter
            :items-per-page="10"
            sorter
            hover
            pagination
          >
            <template #stato="{item}">
              <td>
                <CButton
                  shape="square"
                  variant="outline"
                  size="sm"
                  :color="getStatoColor(item.stato)"
                  @click="handleEdit(item.progressivoIndirizzo)"
                  >{{ getStatoString(item.stato) }}</CButton
                >
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getContext, getStatoColor, getStatoString } from "@/common";
import Progress from "@/components/Progress";

export default {
  name: "addresslist",
  components: {
    "app-progress": Progress
  },
  data() {
    return {
      fields: [
        {
          key: "progressivoIndirizzo",
          label: "Progressivo"
        },
        {
          key: "indirizzoOriginale",
          label: "Indirizzo",
          _style: "min-width:25%;"
        },
        { key: "proCom", label: "PROCOM" },
        { key: "denominazioneComune", label: "Comune" },
        { key: "validazione", label: "Validazione", _style: "width:5%;" },
        {
          key: "stato",
          label: "Stato di lavorazione"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    getStatoString,
    getStatoColor,
    handleEdit(id) {
      this.$store.dispatch("address/setCurrentId", id);
      this.$router.push({
        name: "AddressEdit",
        params: { state: this.$route.params.state }
      });
    },
    load(state) {
      const breadCrumbs = [
        { path: "catalogue", to: "/catalogue" },
        { path: "address", to: "/catalogue/address/" }
      ];
      this.$store.dispatch("coreui/updateBreadcrumbs", breadCrumbs);
      this.$store.dispatch("coreui/setContext", getContext(state));
      this.$store.dispatch("address/clear");
      this.$store.dispatch("address/findByUserAndState", state);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.load(to.params.state);
    next();
  },
  created() {
    this.load(this.$route.params.state);
  }
};
</script>
