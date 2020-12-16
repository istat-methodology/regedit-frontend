<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <CCard v-if="address">
        <CCardHeader>
          {{ address.AddressOriginal }}
          <span
            class="badge badge-success ml-2 align-center"
            v-if="address.validazione == 'SI'"
            >Validato</span
          >
          <div class="card-header-actions">
            <CButton
              shape="square"
              size="sm"
              color="primary"
              class="btn-next mr-2"
              @click="handleSkip"
              >Salta<arrow-right-icon
            /></CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <div class="row">
            <div class="col-4">
              <address-original :address="address" />
            </div>
            <div class="col-4">
              <address-suggested
                :address="address"
                @validate="handleValidate"
              />
            </div>
            <div class="col-4">
              <address-revised :address="address" @revise="handleRevise" />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddressOriginal from "./domain/AddressOriginal";
import AddressSuggested from "./domain/AddressSuggested";
import AddressRevised from "./domain/AddressRevised";

export default {
  name: "AddressEdit",
  components: {
    "address-original": AddressOriginal,
    "address-suggested": AddressSuggested,
    "address-revised": AddressRevised
  },
  computed: {
    ...mapGetters("address", {
      address: "address",
      addressNext: "addressNext",
      addressPrev: "addressPrev"
    }),
    ...mapGetters("coreui", ["isLoading"])
  },
  methods: {
    handleSkip() {
      var addr = { ...this.address, stato: 3, validazione: "NO" };
      this.$store.dispatch("address/update", addr);
    },
    handleValidate() {
      var addr = { ...this.address, stato: 2, validazione: "SI" };
      this.$store.dispatch("address/update", addr);
    },
    handleRevise() {
      var addr = { ...this.address, stato: 2, validazione: "NO" };
      this.$store.dispatch("address/update", addr);
    }
  },
  created() {
    /*  this.$store.dispatch("dug/findAll"); */
    this.$store.dispatch("address/findById", this.$route.params.id);
  }
};
</script>

<style scoped>
.btn-prev > .material-design-icon > .material-design-icon__svg {
  width: 1.4rem;
  height: 1.1rem;
  bottom: auto;
  padding-right: 5px;
}
.btn-prev-bottom > .material-design-icon > .material-design-icon__svg {
  width: 1.4rem;
  height: 1rem;
  bottom: auto;
  padding-right: 5px;
}
.btn-next > .material-design-icon > .material-design-icon__svg {
  width: 1.1rem;
  height: 1.1rem;
  bottom: auto;
}
.color-success {
  color: #2eb85c;
}
</style>
