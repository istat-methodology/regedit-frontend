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
            <template #validazione="{item}">
              <td>{{ item.validazione | dashEmpty }}</td>
            </template>
            <template #action="{item}">
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
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Progress from "@/components/Progress";
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressList",
  mixins: [addressMixin],
  components: {
    "app-progress": Progress
  },
  data() {
    return {
      fields: [
        {
          key: "progressivoIndirizzo",
          label: "Progressivo",
          _style: "width:10%;"
        },
        {
          key: "indirizzoOriginale",
          label: "Indirizzo",
          _style: "min-width:25%;"
        },
        { key: "proCom", label: "Procom" },
        { key: "denominazioneComune", label: "Comune" },
        { key: "validazione", label: "Validazione", _style: "width:10%;" },
        {
          key: "action",
          label: "",
          _style: "width:10%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    handleEdit(id) {
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
