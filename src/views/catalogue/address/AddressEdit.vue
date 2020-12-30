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
import { getContext } from "@/common";

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
    ...mapGetters("address", ["address"]),
    ...mapGetters("coreui", ["isLoading"]),
    fonte() {
      return this.getFonteById(this.address.idFonte);
    }
  },
  methods: {
    getContext,
    handleOpen() {
      var addr = { ...this.address, stato: 1, validazione: "" };
      this.$store.dispatch("address/open", addr).then(() => {
        this.$store.dispatch(
          "message/success",
          "L'indirizzo " + addr.indirizzoOriginale + " può essere modificato!"
        );
      });
    },
    handleSkip() {
      var addr = { ...this.address, stato: 3, validazione: "NO" };
      this.update(addr, this.addressState.Skip);
    },
    handleValidate() {
      var addr = { ...this.address, stato: 2, validazione: "SI" };
      this.update(addr, this.addressState.Validated);
    },
    handleRevise() {
      var addr = { ...this.address, stato: 2, validazione: "NO" };
      this.update(addr, this.addressState.Revised);
    },
    update(address, state) {
      this.$store.dispatch("address/update", address).then(() => {
        this.$store.dispatch(
          "message/" + this.getAddressMessageType(state),
          this.getAddressMessage(address, state)
        );
        setTimeout(() => {
          this.$store.dispatch(
            "address/findNextAddress",
            this.$route.params.state
          );
        }, 500);
      });
    }
  },
  created() {
    const breadCrumbs = [
      { path: "catalogue", to: "/catalogue" },
      {
        path: "address",
        to: "/catalogue/address/view/" + this.$route.params.state
      },
      {
        path: "edit",
        to: "/catalogue/address/edit/" + this.$route.params.state
      }
    ];
    this.$store.dispatch(
      "coreui/setContext",
      getContext(this.$route.params.state)
    );
    this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("coreui/updateBreadcrumbs", breadCrumbs);
    this.$store.dispatch("dug/findAll").then(() => {
      this.$store.dispatch("address/findById");
    });
  }
};
</script>
