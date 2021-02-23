<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <app-search-filter
        @filter="handleFilter"
        :stato="this.$route.params.state"
      />
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="addresses"
            :fields="fields"
            column-filter
            :items-per-page="50"
            :sorterValue="sorterValue"
            @filtered-items-change="sortChange"
            hover
            pagination
            sorter
          >
            <!--  @update:sorter-value="sortChanged" -->
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
                  @click="handleEdit(item.progressivoIndirizzo, item.index)"
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
import SearchFilter from "@/components/SearchFilter";

export default {
  name: "AddressList",
  mixins: [addressMixin],
  components: {
    "app-search-filter": SearchFilter
  },
  data() {
    return {
      sorterValue: { column: null, asc: false }
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    sortChange(sortArray) {
      /*  console.log(sortArray); */
      this.$store.dispatch("address/setSortedList", sortArray);
    },
    handleEdit(id, index) {
      this.$store.dispatch("address/setCurrentId", id);
      this.$store.dispatch("address/setCurrentIndex", index);
      this.$router.push({
        name: "AddressEdit",
        params: { state: this.$route.params.state }
      });
      console.log(index);
    },
    handleFilter() {
      this.$store.dispatch(
        "address/findByUserAndState",
        this.$route.params.state
      );
    },
    load(state) {
      this.$store.dispatch("coreui/setContext", state);
      this.$store.dispatch("address/clear");
      this.$store.dispatch("address/findByUserAndState", state);
      this.$store.dispatch("progress/findByUser");
      this.$store.dispatch("elencoComuni/findComuniByUserAndState", state);
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
.table thead th {
  padding: 0.2rem 0.45rem;
}
</style>
