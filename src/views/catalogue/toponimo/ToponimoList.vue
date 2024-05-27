<template>
  <div class="row" v-if="this.$route.params.state < 8">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <app-search-filter-top
        @filter="handleFilter"
        @validate="modalOpen"
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
            @row-clicked="handleSoglia"
            @filtered-items-change="sortChange"
            hover
            pagination
            sorter
            clickableRows
          >
            <template #toponimoOrig="{item}">
              <td>{{ item.toponimoOrig | dashEmpty }}</td>
            </template>
            <template #toponimoProb="{item}">
              <td>{{ item.toponimoProb | dashEmpty }}</td>
            </template>
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
    <CModal title="Warning!" :show.sync="warningModal">
      <template #footer>
        <CButton shape="square" size="sm" color="light" @click="modalClose">
          Chiudi
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="handleValidate"
        >
          Valida
        </CButton>
      </template>
      Sei sicuro di voler validare tutti gli elementi della lista?
    </CModal>
  </div>
  <div class="row" v-else>
    <div class="col-12">
      <!-- <app-prob-linkage-parameters
        @runScript="runScript"
        :stato="this.$route.params.state"
        :spinnerVisible="this.spinnerVis"
      /> -->
      <div class="card fade-in">
        <CCardHeader
          ><span class="filter-head"
            >Parametri Probabilistic Linkage</span
          ></CCardHeader
        >
        <CCardBody>
          <div class="row col-12">
            <div class="col-3">
              <MultiSelect
                ref="multiSelect"
                v-if="province"
                v-model="values"
                search
                historyButton
                :options="options"
                :filters="filters"
                :btnLabel="btnLabel"
                :selectOptions="province"
              >
                <template v-slot:option="{ option }">
                  <input type="checkbox" :checked="option.selected" />
                  <span>{{ option.name }}</span>
                </template>
                ></MultiSelect
              >
            </div>
            <div class="col-3">
              <v-select
                v-if="archivioCodes"
                label="descrizioneArchivio"
                :options="archivioCodes"
                placeholder="Codice Archivio"
                @input="changedCodArchivio"
                v-model="codArchivio"
              ></v-select>
            </div>
            <div class="col-2">
              <CInput
                placeholder="Soglia (default 0.6)"
                v-model="soglia"
                :class="{
                  'is-invalid': $v.soglia.$error
                }"
              />
              <p class="error" v-if="!$v.soglia.validationRule">
                I valori possibili per questo campo sono soltanto numerici e
                lunghi al massimo 5 caratteri incluso il punto. Sono ammessi
                soltanto valori compresi tra 0 e 1.
              </p>
            </div>

            <div class="col-2" v-if="isScriptRunning">
              <CButton shape="square" size="sm" color="primary" disabled>
                <CSpinner
                  as="span"
                  size="sm"
                  variant="grow"
                  aria-hidden="true"
                />
                Esecuzione in corso...
              </CButton>
            </div>
            <div class="col-2" v-else>
              <CButton
                shape="square"
                size="sm"
                color="primary"
                @click="runScript"
              >
                Esegui Script
              </CButton>
            </div>
            <div class="col-2" v-if="isRServeOn">
              <CBadge color="success">RSERVE Connesso</CBadge>
            </div>
            <div class="col-2" v-else>
              <CBadge color="warning">RSERVE non risponde</CBadge>
            </div>
          </div>
        </CCardBody>
      </div>
      <div class="card fade-in">
        <CTabs variant="pills" :active-tab="0">
          <CTab title="Elenco Script">
            <CDataTable
              :items="elencoScript"
              :fields="elencoScriptFields"
              column-filter
              items-per-page-select
              :items-per-page="items4pageScript"
              :sorterValue="sorterValue"
              @filtered-items-change="sortChange"
              hover
              pagination
              clickableRows
            >
              <template #codiciProvincia="{item}">
                <td>{{ item.codiciProvincia | dashEmpty }}</td>
              </template>
              <template #soglia="{item}">
                <td>{{ ("0" + item.soglia) | dashEmpty }}</td>
              </template>
              <template #dataInizio="{item}">
                <td>{{ item.dataInizio | formatDate }}</td>
              </template>
              <template #dataFine="{item}">
                <td>{{ item.dataFine | formatDate }}</td>
              </template>
              <template #stato="{item}">
                <td>
                  <CButton
                    shape="square"
                    variant="outline"
                    size="sm"
                    @click="showToponimoList(item)"
                    :color="getStatoColorScript(item.stato)"
                    >{{ getStatoStringScript(item.stato, item.index) }}

                    <CSpinner
                      v-if="item.stato == 0 && item.index == 1"
                      as="span"
                      size="sm"
                      variant="grow"
                      aria-hidden="true"
                    />
                  </CButton>
                </td>
              </template>
            </CDataTable>
          </CTab>
          <CTab title="Elenco Toponimi">
            <CDataTable
              :items="tabellaScript"
              :fields="scriptFields"
              column-filter
              items-per-page-select
              :items-per-page="items4pageScript"
              :sorterValue="sorterValue"
              @filtered-items-change="sortChange"
              hover
              pagination
              sorter
            >
            </CDataTable>
          </CTab>
          <CTab title="Script Output">
            <CTextarea
              id="ScriptTextarea"
              label=""
              rows="10"
              :value="returnValueScript"
              readonly
            ></CTextarea>
          </CTab>
        </CTabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import toponimoMixin from "@/components/mixins/toponimo.mixin";
import { CSpinner } from "@coreui/vue";
import SearchFilterTop from "@/components/SearchFilterTop";
import vueMultiSelect from "vue-multi-select";
import "vue-multi-select/dist/lib/vue-multi-select.css";
import { required, maxLength } from "vuelidate/lib/validators";
//import ProbLinkageParameters from "@/components/ProbLinkageParameters";
//import { CNav } from "@coreui/vue";
//import { CNavItem } from "@coreui/vue";
//import { CNavLink } from "@coreui/vue";
import { CTab } from "@coreui/vue";
import { CTabs } from "@coreui/vue";

export default {
  name: "ToponimoList",
  mixins: [toponimoMixin],
  components: {
    "app-search-filter-top": SearchFilterTop,
    CSpinner,
    MultiSelect: vueMultiSelect,
    /* CNav,
    CNavItem,
    CNavLink */
    CTab,
    CTabs

    //"app-prob-linkage-parameters": ProbLinkageParameters
  },
  data() {
    return {
      sorterValue: { column: null, asc: false },
      items4page: 50,
      items4pageScript: 5,
      globalCheck: false,
      warningModal: false,
      spinnerVisible: false,
      codArchivio: null,
      soglia: null,
      tabPaneActiveKey: 1,
      values: [],
      returnValueScript: "",
      intervalId: null,
      intervalIdScriptRunning: null,
      rServerConnesso: false,
      btnLabel: () => "Elenco Province",
      filters: [
        {
          nameAll: "Select all",
          nameNotAll: "Deselect all",
          func() {
            return true;
          }
        } /* ,
        {
          nameAll: "select <= 10",
          nameNotAll: "Deselect <= 10",
          func(elem) {
            return elem.name <= 10;
          }
        },
        {
          nameAll: "Select contains 2",
          nameNotAll: "Deselect contains 2",
          func(elem) {
            return elem.name.indexOf("2") !== -1;
          }
        } */
      ],
      options: {
        multi: true
        //groups: true
      }
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("toponimo", ["toponimi", "filterTopProvincia"]),
    //...mapGetters("valueScript", ["returnValueScript"]),
    ...mapGetters("scriptRunning", ["isScriptRunning"]),
    ...mapGetters("elencoProvinceScript", ["provinceScript"]),
    ...mapGetters("archivio", ["archivioCodes"]),
    ...mapGetters("tabella", ["tabellaScript"]),
    ...mapGetters("elenco", ["elencoScript"]),
    ...mapGetters("elenco", ["lastScriptRunning"]),
    ...mapGetters("rServe", ["rResponse"]),
    province: {
      get: function() {
        return this.provinceScript;
      }
      /* ,
      set: function(selectedProvincia) {
        this.$store.dispatch(
          "toponimo/setFilterTopProvincia",
          selectedProvincia
        );
      } */
    }
  },
  validations: {
    values: {
      required
    },
    codArchivio: {
      required
    },
    soglia: {
      validationRule() {
        return (
          (/^[0-9?,.]*$/.test(this.soglia) || /^[null]/.test(this.soglia)) &&
          this.soglia <= 1
        );
      },
      maxLength: maxLength(5)
    }
  },
  methods: {
    async runScript() {
      let elencoProv = this.elencoProvince();
      this.$v.$touch(); //validate form data
      if (this.elencoScript[0].stato != 0) {
        if (!this.$v.$invalid && this.soglia != null && this.soglia != "") {
          let payload = {
            province: this.values != null ? elencoProv : "",
            codArchivio:
              this.codArchivio.codiceArchivio != null
                ? this.codArchivio.codiceArchivio
                : "",
            soglia: this.soglia != null ? this.soglia : ""
          };
          //this.spinnerVisible = true;
          this.intervalId = setInterval(() => {
            this.updateElenco();
          }, 3000);
          this.intervalIdScriptRunning = setInterval(() => {
            this.verifyScriptRunning();
          }, 5000);
          this.$store.dispatch("scriptRunning/setScriptRunning", true);
          await this.$store.dispatch("valueScript/execScript", payload);
          this.$store.dispatch("elenco/findElencoByUser");
          //this.spinnerVisible = false;
          /* if (this.elencoScript[0].stato == 0) {
            this.$store.dispatch("scriptRunning/setScriptRunning", false);
          } */
          this.$store.dispatch("tabella/findTabellaByUser");
        } else {
          this.$store.dispatch(
            "message/warning",
            "Valorizzare i campi province, Soglia e Codoce Archivio prima di avviare lo script",
            {
              root: true
            }
          );
        }
      } else {
        this.$store.dispatch(
          "message/warning",
          "Attendere il termine dell'ultimo processo",
          {
            root: true
          }
        );
        this.$store.dispatch("elenco/findElencoByUser");
      }
    },
    getStatoColorScript(stato) {
      switch (stato) {
        case -1:
          return "warning";
        case 0:
          return "danger";
        case 1:
          return "success";
        default:
          return "primary";
      }
    },
    getStatoStringScript(stato, indice) {
      switch (stato) {
        case -1:
          return "Errore script";
        case 0:
          if (indice > 1) {
            return "Esecuzione abortita";
          }
          return "Esecuzione in corso..";

        case 1:
          return "Completato";
        default:
          return "";
      }
    },
    updateElenco() {
      this.$store.dispatch("elenco/findElencoByUser");
      clearInterval(this.intervalId);
    },
    isRServeOn() {
      return this.rResponse == "ok" ? true : false;
    },
    async verifyScriptRunning() {
      console.log("Verifica in Corso......");
      await this.$store.dispatch("elenco/findScriptRunningByUser");
      if (this.lastScriptRunning.stato && this.lastScriptRunning.stato != 0) {
        this.$store.dispatch("scriptRunning/setScriptRunning", false);
        this.$store.dispatch("elenco/findElencoByUser");
        clearInterval(this.intervalIdScriptRunning);
      }
    },
    elencoProvince() {
      return this.values.map(val => {
        return val.name;
      });
    },
    changedValueProvincia() {},
    showToponimoList(item) {
      this.$store.dispatch("tabella/findTabellaByUserAndProc", item.idProcesso);
      this.returnValueScript = this.elencoScript[item.index - 1].esito;
      this.$store.dispatch("message/warning", "Record selezionato.", {
        root: true
      });
    },
    modalOpen() {
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    },
    changedCodArchivio() {
      console.log(this.codArchivio);
    },
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
          this.$store
            .dispatch("toponimo/findByUserAndState", this.$route.params.state)
            .then(() => {
              this.$store.dispatch("progressTop/findByUser");
            });
        });
      });
      this.warningModal = false;
    },
    load(state) {
      let payload = {
        state: state,
        provincia:
          this.filterTopProvincia != null
            ? this.filterTopProvincia.denominazioneProvincia
            : null
      };
      this.$store.dispatch("rServe/getResponse");
      this.$store.dispatch("coreui/setContext", state);
      this.$store.dispatch("toponimo/clearTop");
      this.$store.dispatch("toponimo/findByUserAndState", state);
      this.$store.dispatch("progressTop/findByUser");
      this.$store.dispatch("elencoComuni/findTopComuniByUserAndState", payload);
      this.$store.dispatch(
        "elencoProvince/findTopProvinceByUserAndState",
        state
      );
      this.$store.dispatch("elencoProvinceScript/findProvinceByScript");
      this.$store.dispatch("archivio/findArchivioCodes");
      this.$store.dispatch("elenco/findElencoByUser");
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

  /*  mounted() {
    this.intervalIdScriptRunning = setInterval(() => {
      this.verifyScriptRunning();
    }, 5000);
  },
  onUnmounted() {
    clearInterval(this.intervalIdScriptRunning);
  } */
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
