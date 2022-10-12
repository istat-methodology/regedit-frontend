<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <template v-if="toponimo">
        <app-progressTop class="fade-in" />
        <div class="row fade-in">
          <div class="col-8">
            <div class="row">
              <div class="col-6">
                <toponimo-original
                  :toponimo="toponimo"
                  @skip="handleSkip"
                  @next="handleNext"
                  @open="handleOpen"
                />
              </div>
              <div class="col-6">
                <toponimo-suggested
                  :toponimo="toponimo"
                  @validate="handleValidate"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <CCard>
                  <CCardHeader class="card-header-light-grey">
                    <span class="card-header-span">Note</span>
                  </CCardHeader>
                  <CCardBody class="card-text">
                    <CTextarea
                      placeholder="Note"
                      rows="5"
                      v-model="toponimo.note"
                    />
                  </CCardBody>
                </CCard>
              </div>
            </div>
          </div>
          <div class="col-4">
            <template v-if="toponimo.stato == toponimoState.Revised">
              <toponimo-revised-view :toponimo="toponimo" />
            </template>
            <template v-else>
              <toponimo-revised-edit
                :toponimo="toponimo"
                :fonte="fonte"
                :fittizio="fittizio"
                @revise="handleRevise"
              />
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <tile></tile>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ProgressTop from "@/components/ProgressTop";
import ToponimoOriginal from "./domain/ToponimoOriginal";
import ToponimoSuggested from "./domain/ToponimoSuggested";
import ToponimoRevisedEdit from "./domain/ToponimoRevisedEdit";
import ToponimoRevisedView from "./domain/ToponimoRevisedView";
import fonteMixin from "@/components/mixins/fonte.mixin";
import fittizioMixin from "@/components/mixins/fittizio.mixin";
import toponimoMixin from "@/components/mixins/toponimo.mixin";

export default {
  name: "ToponimoEdit",
  mixins: [fonteMixin, fittizioMixin, toponimoMixin],
  components: {
    "toponimo-original": ToponimoOriginal,
    "toponimo-suggested": ToponimoSuggested,
    "toponimo-revised-edit": ToponimoRevisedEdit,
    "toponimo-revised-view": ToponimoRevisedView,
    "app-progressTop": ProgressTop
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("auth", ["isSupervisor", "loggedUser"]),
    ...mapGetters("toponimo", ["toponimo", "filterComune", "filterAddress"]),
    fonte() {
      return this.getFonteById(this.toponimo.idFonte);
    },
    fittizio() {
      return this.getFittizioById(parseInt(this.toponimo.fittizio));
    }
  },
  methods: {
    handleOpen() {
      var top = {
        ...this.toponimo,
        stato: 1,
        validazione: "",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.$store.dispatch("toponimo/open", top).then(() => {
        this.$store.dispatch(
          "message/success",
          "L'indirizzo " + top.toponimoOriginale + " può essere modificato!"
        );
      });
    },
    handleSkip() {
      var top = {
        ...this.toponimo,
        stato: 3,
        validazione: "NO",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(top, this.toponimoState.Skip);
    },
    handleValidate() {
      var top = {
        ...this.toponimo,
        stato: 2,
        validazione: "SI",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(top, this.toponimoState.Validated);
    },
    handleRevise() {
      var addr = {
        ...this.toponimo,
        stato: 2,
        validazione: "NO",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(addr, this.toponimoState.Revised);
    },
    update(toponimo, state) {
      this.$store.dispatch("toponimo/update", toponimo).then(() => {
        this.$store.dispatch(
          "message/" + this.getToponimoMessageType(state),
          this.getAddressMessage(toponimo, state)
        );
        this.$store.dispatch("toponimo/updateCurrentIndex");
        setTimeout(() => {
          this.$store
            .dispatch("toponimo/findNextToponimo")
            .then(res => this.checkCompleted(res));
          this.$store.dispatch("progressTop/findByUser");
        }, 500);
      });
    },
    handleNext() {
      this.$store.dispatch("toponimo/updateCurrentIndex");
      setTimeout(() => {
        this.$store
          .dispatch("toponimo/findNextToponimo")
          .then(res => this.checkCompleted(res));
        this.$store.dispatch("progressTop/findByUser");
        this.$router.push({
          name: "ToponimoEdit",
          params: { state: this.$route.params.state }
        });
      }, 500);
    },
    checkCompleted(isok) {
      if (!isok) {
        if (this.filterComune || this.filterToponimo) {
          this.$store.dispatch(
            "message/success",
            this.getCompletedMessage(this.filterComune, this.filterToponimo)
          );
          this.$store.dispatch("toponimo/clearFilters");
          this.$router.push({
            name: "ToponimoList",
            params: { state: this.$route.params.state }
          });
        } else {
          this.$store.dispatch(
            "message/success",
            "Complimenti hai completato il tuo lavoro!"
          ),
            this.$router.push("/catalogue");
        }
      }
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", this.$route.params.state);
    this.$store.dispatch("progressTop/findByUser");
    this.$store.dispatch("dug/findAll").then(() => {
      const currentId = this.$store.getters["toponimo/currentId"];
      if (currentId > 0) {
        this.$store.dispatch("toponimo/findById", currentId);
      } else {
        this.$store
          .dispatch(
            "toponimo/findNextToponimoToWorkSoon",
            this.$route.params.state
          )
          .then(res => this.checkCompleted(res));
      }
    });
  }
};
</script>

<style scoped>
.card-header-span {
  font-weight: 600;
  line-height: 1.7;
}
</style>
