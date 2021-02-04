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
                :options="comuni"
                placeholder="Tutti i comuni"
                v-model="comune"
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
            :items="selectableAddresses"
            :fields="blockFields"
            :items-per-page="50"
            addTableClasses="table-block"
            sorter
            hover
            pagination
          >
            <template #selected-header>
              <CInputCheckbox
                :checked="globalCheck"
                @update:checked="toggleAll"
              />
            </template>
            <template #selected="{item}">
              <td>
                <CInputCheckbox
                  :checked="item.selected"
                  @update:checked="toggleSelected(item)"
                />
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
import { Context } from "@/common";
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressList",
  mixins: [addressMixin],
  data: () => {
    return {
      comuni: ["Arluno", "Basiglio", "Corbetta"],
      comune: null,
      indirizzo: "",
      globalCheck: false
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"]),
    ...mapGetters("address", ["filterPROCOM"]),
    ...mapGetters("address", ["filterAddress"]),
    selectableAddresses() {
      return this.addresses
        ? this.addresses.map((address, index) => {
            return {
              ...address,
              index,
              selected: false
            };
          })
        : [];
    }
  },
  methods: {
    toggleSelected(address) {
      address.selected = !address.selected;
    },
    toggleAll() {
      this.globalCheck = !this.globalCheck;
      this.selectableAddresses.map(address => {
        address.selected = this.globalCheck;
      });
    },
    handleFilter() {
      var filters;
      filters = {
        procom: this.comune,
        address: this.indirizzo
      };
      this.$store.dispatch("address/setFilters", filters);
      console.log("Clicked filter!");
    },
    load(state) {
      this.$store.dispatch("coreui/setContext", Context.Block);
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

<style scoped>
.filter-head {
  font-weight: 600;
}
.form-check {
  padding-bottom: 1.25rem;
}
.table thead th {
  padding: 0.45rem 0.65rem;
}
</style>
