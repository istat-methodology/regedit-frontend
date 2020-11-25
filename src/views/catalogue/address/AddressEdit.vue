<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <CCard v-if="address">
        <CCardHeader>
          {{ address.indirizzo_originale }}
          <span
            class="badge badge-success ml-2 align-center"
            v-if="address.validato"
            >Validato</span
          >
          <div class="card-header-actions">
            <CButtonGroup>
              <CButton
                shape="square"
                size="sm"
                color="primary"
                class="btn-prev mr-2"
                @click.prevent="prevAddress"
                ><arrow-left-icon /> Prev</CButton
              >
              <CButton
                shape="square"
                size="sm"
                color="primary"
                class="btn-next mr-2"
                @click="nextAddress"
                >Next<arrow-right-icon
              /></CButton>
            </CButtonGroup>
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
                @revise="handleRevise"
              />
            </div>
            <div class="col-4">
              <address-revised :address="address" @save="handleSubmit" />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddressOriginal from "./AddressOriginal";
import AddressSuggested from "./AddressSuggested";
import AddressRevised from "./AddressRevised";

export default {
  name: "AddressEdit",
  components: {
    "address-original": AddressOriginal,
    "address-suggested": AddressSuggested,
    "address-revised": AddressRevised
  },
  computed: {
    ...mapGetters("addressServ", {
      address: "address",
      addressNext: "addressNext",
      addressPrev: "addressPrev"
    }),
    ...mapGetters("coreui", ["isLoading"])
  },
  methods: {
    handleValidate() {
      var addr = { ...this.address, validato: true };
      this.$store.dispatch("addressServ/update", addr);
    },
    handleRevise() {
      var addr = { ...this.address, revisionato: true };
      this.$store.dispatch("addressServ/update", addr);
    },
    handleSubmit() {
      var addr = { ...this.address, validato: true, revisionato: true };
      this.$store.dispatch("addressServ/update", addr);
    },
    prevAddress() {
      this.$store.dispatch("addressServ/findById", this.addressPrev.id);
    },
    nextAddress() {
      this.$store.dispatch("addressServ/findById", this.addressNext.id);
    }
  },
  created() {
    this.$store.dispatch("addressServ/findById", this.$route.params.id);
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
