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
            :items="toponimi"
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
import toponimoMixin from "@/components/mixins/toponimo.mixin";
import { Context } from "@/common";
import SearchFilter from "@/components/SearchFilter";
import MassiveUpdate from "@/components/MassiveUpdate";

export default {
  name: "ToponimoBlockList",
  mixins: [toponimoMixin],
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
    ...mapGetters("toponimo", ["toponimi"])
  },
  methods: {
    updateSelected(dug, duf, note, localita, codStrada) {
      var payload;
      var toponimoList = [];
      toponimoList = this.getSelected(this.toponimi);

      payload = {
        dug: dug != null ? dug : "",
        duf: duf != null ? duf : "",
        localita: localita != null ? localita : "",
        codStrada: codStrada != null ? codStrada : "",
        note: note != null ? note : "",
        topList: toponimoList
      };
      this.$store.dispatch("massive/update", payload).then(() => {
        this.$store.dispatch(
          "toponimo/findByUserAndState",
          this.$route.params.state
        );
        this.globalCheck = false;
      });
      this.$store.dispatch(
        "progressTop/resetSelected",
        this.$route.params.state
      );
    },
    toggleSelected(toponimo) {
      toponimo.selected = !toponimo.selected;
      if (toponimo.selected) {
        this.$store.dispatch(
          "progressTop/incSelected",
          this.$route.params.state
        );
      } else {
        this.$store.dispatch(
          "progressTop/decSelected",
          this.$route.params.state
        );
      }
    },
    toggleAll() {
      this.globalCheck = !this.globalCheck;
      this.$store.dispatch(
        "progressTop/resetSelected",
        this.$route.params.state
      );
      this.toponimi.map(toponimo => {
        toponimo.selected = this.globalCheck;
        if (toponimo.selected) {
          this.$store.dispatch(
            "progressTop/incSelected",
            this.$route.params.state
          );
        }
      });
    },
    sortChange(sortArray) {
      this.$store.dispatch("toponimo/setSortedTopList", sortArray);
    },
    handleFilter() {
      this.$store.dispatch(
        "toponimo/findByUserAndState",
        this.$route.params.state
      );
      this.globalCheck = false;
      this.$store.dispatch(
        "progressTop/resetSelected",
        this.$route.params.state
      );
    },
    load(state) {
      this.globalCheck = false;
      this.$store.dispatch("progressTop/resetAll");
      this.$store.dispatch("coreui/setContext", state == 1 ? 6 : 7);
      this.$store.dispatch("toponimo/clearTop");
      this.$store.dispatch("toponimo/findByUserAndState", state);
      this.$store.dispatch("progressTop/findByUser");
      this.$store.dispatch(
        "elencoComuni/findComuniByUserAndState",
        state == 6 ? 1 : 3
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
    this.$store.dispatch("progressTop/resetSelected", this.$route.params.state);
    if (this.$route.params.state == 1) {
      this.$store.dispatch("coreui/setContext", Context.Block);
    } else {
      this.$store.dispatch("coreui/setContext", Context.BlockSuspended);
    }
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
