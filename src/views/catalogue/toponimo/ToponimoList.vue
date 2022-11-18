<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <app-search-filter-top
        @filter="handleFilter"
        @validate="handleValidate"
        :stato="this.$route.params.state"
      />
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="toponimi"
            :fields="fields"
            column-filter
            items-per-page-select
            :items-per-page="items4page"
            :sorterValue="sorterValue"
            @row-clicked="handleSoglia"
            @filtered-items-change="sortChange"
            hover
            pagination
            sorter
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
                  @click="handleEdit(item.progressivoToponimo, item.index)"
                  >{{ getStatoString(item.stato, item.validazione) }}</CButton
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
import toponimoMixin from "@/components/mixins/toponimo.mixin";

import SearchFilterTop from "@/components/SearchFilterTop";

export default {
  name: "ToponimoList",
  mixins: [toponimoMixin],
  components: {
    "app-search-filter-top": SearchFilterTop
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
    ...mapGetters("toponimo", ["toponimi"])
  },
  methods: {
    updateSelected(dug, duf, note) {
      var payload;
      var toponimoList = [];
      toponimoList = this.getSelected(this.toponimi);

      payload = {
        dug: dug != null ? dug : "",
        duf: duf != null ? duf : "",
        note: note != null ? note : "",
        toponimoList: toponimoList
      };
      this.$store.dispatch("massive/update", payload).then(() => {
        this.$store.dispatch(
          "toponimo/findByUserAndState",
          this.$route.params.state
        );
      });
      console.log(toponimoList.toString + "-" + dug + "-" + duf + "-" + note);
    },
    toggleSelected(toponimo) {
      toponimo.selected = !toponimo.selected;
    },
    toggleAll() {
      this.globalCheck = !this.globalCheck;
      /* for (let i = 1; i < this.items4page; i++) {
        this.toponimi[i].selected = this.globalCheck;
      } */
      this.toponimi.map(toponimo => {
        toponimo.selected = this.globalCheck;
      });
    },
    sortChange(sortArray) {
      this.$store.dispatch("toponimo/setSortedTopList", sortArray);
    },
    handleEdit(id, index) {
      this.$store.dispatch("toponimo/setCurrentTopId", id);
      this.$store.dispatch("toponimo/setCurrentTopIndex", index);
      this.$router.push({
        name: "ToponimoEdit",
        params: { state: this.$route.params.state }
      });
      console.log(index);
    },
    handleSoglia(toponimo) {
      this.$store.dispatch("toponimo/setFilterTopSoglia", toponimo.sogliaW);
    },
    handleFilter() {
      this.$store.dispatch(
        "toponimo/findByUserAndState",
        this.$route.params.state
      );
    },
    handleValidate() {
      var toponimoList = [];
      var payload;
      toponimoList = this.getToValidate(this.toponimi);
      payload = {
        toponimoList: toponimoList
      };
      this.$store.dispatch("massiveTopVal/update", payload).then(() => {
        this.$store.dispatch("toponimo/setFilterTopSoglia", null).then(() => {
          this.$store.dispatch(
            "toponimo/findByUserAndState",
            this.$route.params.state
          );
        });
        this.$store.dispatch("progressTop/findByUser");
      });
    },
    load(state) {
      this.$store.dispatch("coreui/setContext", state);
      this.$store.dispatch("toponimo/clearTop");
      this.$store.dispatch("toponimo/findByUserAndState", state);
      this.$store.dispatch("progressTop/findByUser");
      this.$store.dispatch("elencoComuni/findTopComuniByUserAndState", state);
      this.$store.dispatch(
        "elencoProvince/findTopProvinceByUserAndState",
        state
      );
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
