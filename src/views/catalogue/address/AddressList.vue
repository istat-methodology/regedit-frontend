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
            :items="selectableAddresses"
            :fields="fields"
            column-filter
            items-per-page-select
            :items-per-page="items4page"
            :sorterValue="sorterValue"
            @filtered-items-change="sortChange"
            hover
            pagination
            sorter
          >
            <template #select-filter>
              <CInputCheckbox @update:checked="e => checkAll(e)" custom />
            </template>

            <template #select="{item}">
              <td>
                <CInputCheckbox
                  :checked="item.selected"
                  @update:checked="check(item)"
                  custom
                />
                <!--  :checked="item._selected" -->
              </td>
            </template>

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
      sorterValue: { column: null, asc: false },
      items4page: 50
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"]),
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
    /* check(item) {
      console.log(item);
    }, */
    check(item) {
      console.log(item, item.index);
      const val = Boolean(this.addresses[item.index].selected);
      /* this.$set(this.addresses[item.index], "selected", !val); */
      this.addresses[item.index].selected = val;
    },
    checkAll(checked) {
      console.log(checked);
      var checkitems = this.items4page;
      for (let i = 1; i <= checkitems; i++) {
        /*  this.$set(this.addresses[i], "selected", checked); */
        this.addresses[i].selected = checked;
      }
      /* this.addresses.forEach(item => {
        console.log(item, item.index);
        if (item.index > checkitems) {
          return;
        }
        this.$set(item, "selected", checked);
      }); */
    },
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
