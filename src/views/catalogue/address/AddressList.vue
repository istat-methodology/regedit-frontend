<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <div class="card fade-in">
        <CCardHeader
          ><span class="filter-head">Filtri di ricerca</span></CCardHeader
        >
        <CCardBody>
          <div class="row">
            <div class="col-4">
              <v-select
                label="name"
                :options="comuni"
                placeholder="Tutti i comuni"
                @input="selectComune"
              ></v-select>
            </div>
            <div class="col-4">
              <CInput placeholder="Indirizzo" v-model="indirizzo" />
            </div>
            <div class="col-4">
              <CButton
                shape="square"
                size="sm"
                color="primary"
                class="mt-1"
                @click="handleFilter"
                >Filtra</CButton
              >
            </div>
          </div>
        </CCardBody>
      </div>
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="addresses"
            :fields="fields"
            column-filter
            :items-per-page="50"
            sorter
            :sorterValue="sorterValue"
            hover
            pagination
          >
            <template #dataMod="{item}">
              <td>{{ item.dataMod | formatDate }}</td>
            </template>
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
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressList",
  mixins: [addressMixin],
  data() {
    return {
      sorterValue: { column: null, asc: false },
      comuni: [
        {
          procom: "15146",
          name: "Milano"
        },
        {
          procom: "15154",
          name: "Nerviano"
        },
        {
          procom: "15166",
          name: "Paderno Dugnano"
        },
        {
          procom: "16108",
          name: "Gandino"
        }
      ],
      procom: null,
      indirizzo: ""
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    selectComune(value) {
      if (value != null) {
        this.procom = value.procom;
      } else {
        this.procom = null;
      }
    },
    handleEdit(id) {
      this.$store.dispatch("address/setCurrentId", id);
      this.$router.push({
        name: "AddressEdit",
        params: { state: this.$route.params.state }
      });
    },
    handleFilter() {
      var filters;
      filters = {
        procom: this.procom,
        address: this.indirizzo
      };
      this.$store.dispatch("address/setFilters", filters);
      this.$store.dispatch(
        "address/findByUserAndState",
        this.$route.params.state
      );
      console.log("Clicked filter!");
    },
    load(state) {
      this.$store.dispatch("coreui/setContext", state);
      this.$store.dispatch("progress/findByUser");
      this.$store.dispatch("address/clear");
      this.$store.dispatch("address/findByUserAndState", state);
      this.sorterValue.column = parseInt(state) > 1 ? "dataMod" : null;
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

<style scoped>
.filter-head {
  font-weight: 600;
}
.table thead th {
  padding: 0.2rem 0.45rem;
}
</style>
