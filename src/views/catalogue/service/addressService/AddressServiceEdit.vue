<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="address">
    <div class="col-12">
      <CCard>
        <CCardHeader>Address</CCardHeader>
        <CCardBody>
          <CInput
            label="codice_archivio_or"
            placeholder="codice_archivio_or"
            :class="{ 'is-invalid': $v.address.codice_archivio_or.$error }"
            v-model="address.codice_archivio_or"
          />
          <div
            class="help-block"
            :class="{ show: $v.address.codice_archivio_or.$error }"
          >
            This field is required
          </div>
          <CInput
            label="progressivo_indirizzo_or"
            placeholder="progressivo_indirizzo_or"
            :class="{
              'is-invalid': $v.address.progressivo_indirizzo_or.$error
            }"
            v-model="address.progressivo_indirizzo_or"
          />
          <div
            class="help-block"
            :class="{ show: $v.address.progressivo_indirizzo_or.$error }"
          >
            This field is required
          </div>
          <CInput
            label="comune_or"
            placeholder="comune_or"
            :class="{
              'is-invalid': $v.address.comune_or.$error
            }"
            v-model="address.comune_or"
          />
          <div
            class="help-block"
            :class="{ show: $v.address.comune_or.$error }"
          >
            This field is required
          </div>
          <CInput
            label="localita_or"
            placeholder="localita_or"
            :class="{
              'is-invalid': $v.address.localita_or.$error
            }"
            v-model="address.localita_or"
          />
          <div
            class="help-block"
            :class="{ show: $v.address.localita_or.$error }"
          >
            This field is required
          </div>
        </CCardBody>
        <CCardFooter>
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mr-2"
            @click.prevent="handleSubmit"
            >Next</CButton
          >
          <CButton
            shape="square"
            size="sm"
            color="light"
            @click.prevent="backToList"
            >Back</CButton
          >
        </CCardFooter>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AddressEdit",
  computed: {
    ...mapGetters("addressServ", ["addressService"])
  },
  validations: {
    address: {
      codice_archivio_or: {
        required
      },
      progressivo_indirizzo_or: {
        required
      },
      comune_or: {
        required
      },
      localita_or: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.address.$invalid) {
        this.$store.dispatch("addressServ/update", this.address).then(() => {
          this.backToList();
        });
      }
    },
    backToList() {
      this.$router.push("/catalogue/address");
    }
  },
  created() {
    this.$store.dispatch("addressServ/findById", this.$route.params.id);
  }
};
</script>
