<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <template v-if="address">
        <app-progress class="fade-in" />
        <div class="row fade-in">
          <div class="col-4">
            <address-original
              :address="address"
              @skip="handleSkip"
              @open="handleOpen"
            />
          </div>
          <div class="col-4">
            <address-suggested :address="address" @validate="handleValidate" />
          </div>
          <div class="col-4">
            <template v-if="address.stato == addressState.Revised">
              <address-revised-view :address="address" />
            </template>
            <template v-else>
              <address-revised-edit
                :address="address"
                :fonte="fonte"
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
import Progress from "@/components/Progress";
import AddressOriginal from "./domain/AddressOriginal";
import AddressSuggested from "./domain/AddressSuggested";
import AddressRevisedEdit from "./domain/AddressRevisedEdit";
import AddressRevisedView from "./domain/AddressRevisedView";
import fonteMixin from "@/components/mixins/fonte.mixin";
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressEdit",
  mixins: [fonteMixin, addressMixin],
  components: {
    "address-original": AddressOriginal,
    "address-suggested": AddressSuggested,
    "address-revised-edit": AddressRevisedEdit,
    "address-revised-view": AddressRevisedView,
    "app-progress": Progress
  },
  computed: {
    ...mapGetters("auth", ["isSupervisor", "loggedUser"]),
    ...mapGetters("address", ["address"]),
    ...mapGetters("coreui", ["isLoading"]),
    fonte() {
      return this.getFonteById(this.address.idFonte);
    }
  },
  methods: {
    handleOpen() {
      var addr = {
        ...this.address,
        stato: 1,
        validazione: "",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.$store.dispatch("address/open", addr).then(() => {
        this.$store.dispatch(
          "message/success",
          "L'indirizzo " + addr.indirizzoOriginale + " può essere modificato!"
        );
      });
    },
    handleSkip() {
      var addr = {
        ...this.address,
        stato: 3,
        validazione: "NO",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(addr, this.addressState.Skip);
    },
    handleValidate() {
      var addr = {
        ...this.address,
        stato: 2,
        validazione: "SI",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(addr, this.addressState.Validated);
    },
    handleRevise() {
      var addr = {
        ...this.address,
        stato: 2,
        validazione: "NO",
        idSupervisor: this.isSupervisor ? this.loggedUser.userId : null
      };
      this.update(addr, this.addressState.Revised);
    },
    update(address, state) {
      this.$store.dispatch("address/update", address).then(() => {
        this.$store.dispatch(
          "message/" + this.getAddressMessageType(state),
          this.getAddressMessage(address, state)
        );
        setTimeout(() => {
          this.$store
            .dispatch("address/findNextAddress", this.$route.params.state)
            .then(res => this.checkCompleted(res));
          this.$store.dispatch("progress/findByUser");
        }, 500);
      });
    },
    checkCompleted(nextAddress) {
      if (Object.keys(nextAddress).length === 0) {
        this.$store.dispatch(
          "message/success",
          "Complimenti hai completato il tuo lavoro!"
        );
        this.$router.push("/catalogue");
      }
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", this.$route.params.state);
    this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("dug/findAll").then(() => {
      const currentId = this.$store.getters["address/currentId"];
      if (currentId > 0) {
        this.$store.dispatch("address/findById", currentId);
      } else {
        this.$store
          .dispatch("address/findNextAddress", this.$route.params.state)
          .then(res => this.checkCompleted(res));
      }
    });
  }
};
</script>
