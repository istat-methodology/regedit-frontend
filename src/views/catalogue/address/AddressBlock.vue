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
      <app-massive-update @update-selected="updateSelected" />
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="addresses"
            :fields="blockFields"
            column-filter
            items-per-page-select
            :items-per-page="items4page"
            :sorterValue="sorterValue"
            hover
            pagination
            sorter
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
            <template #dataMod="{item}">
              <td>{{ item.dataMod | formatDate }}</td>
            </template>
            <template #validazione="{item}">
              <td>{{ item.validazione | dashEmpty }}</td>
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
import MassiveUpdate from "@/components/MassiveUpdate";

export default {
  name: "AddressList",
  mixins: [addressMixin],
  components: {
    "app-search-filter": SearchFilter,
    "app-massive-update": MassiveUpdate
  },
  data() {
    return {
      sorterValue: { column: null, asc: false },
      items4page: 50,
      globalCheck: false
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    updateSelected(dug, duf, note) {
      var payload;
      var addressList = [];
      addressList = this.getSelected(this.addresses);

      payload = {
        dug: dug != null ? dug : "",
        duf: duf != null ? duf : "",
        note: note != null ? note : "",
        addrList: addressList
      };
      this.$store.dispatch("massive/update", payload).then(() => {
        this.$store.dispatch(
          "address/findByUserAndState",
          this.$route.params.state
        );
        this.globalCheck = false;
      });
      this.$store.dispatch("progress/resetSelected");
    },
    toggleSelected(address) {
      address.selected = !address.selected;
      if (address.selected) {
        this.$store.dispatch("progress/incSelected");
      } else {
        this.$store.dispatch("progress/decSelected");
      }
    },
    toggleAll() {
      this.globalCheck = !this.globalCheck;
      this.$store.dispatch("progress/resetSelected");
      this.addresses.map(address => {
        address.selected = this.globalCheck;
        if (address.selected) {
          this.$store.dispatch("progress/incSelected");
        }
      });
    },
    sortChange(sortArray) {
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
      this.actualState = state;
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
    this.$store.dispatch("dug/findAll");
    this.$store.dispatch("progress/resetSelected");
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
