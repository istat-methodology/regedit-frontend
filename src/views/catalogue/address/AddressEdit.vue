<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="address">
    <div class="col-12">
      <CCard>
        <CCardHeader>Address</CCardHeader>
        <CCardBody>
          <CTabs :active-tab="0" ref="tabs">
            <CTab title="Dati di input">
              <div class="row">
                <div class="col-6">
                  <CCard>
                    <CCardHeader>Indirizzo originale</CCardHeader>
                    <CCardBody>
                      <CInput
                        label="codice archivio"
                        placeholder="codice archivio"
                        v-model="address.codice_archivio_or"
                        disabled
                      />
                      <CInput
                        label="progressivo indirizzo"
                        placeholder="progressivo indirizzo"
                        v-model="address.progressivo_indirizzo_or"
                        disabled
                      />
                      <CInput
                        label="comune"
                        placeholder="comune"
                        v-model="address.comune_or"
                        disabled
                      />
                      <CInput
                        label="località"
                        placeholder="località"
                        v-model="address.localita_or"
                        disabled
                      />
                      <CInput
                        label="indirizzo"
                        placeholder="indirizzo"
                        v-model="address.indirizzo_originale"
                        disabled
                      />
                    </CCardBody>
                  </CCard>
                </div>
                <div class="col-6">
                  <CCard>
                    <CCardHeader>Indirizzo normalizzato</CCardHeader>
                    <CCardBody>
                      <CInput
                        label="località"
                        placeholder="località"
                        v-model="address.localita_su"
                        disabled
                      />
                      <CInput
                        label="dug"
                        placeholder="dug"
                        v-model="address.dug_su"
                        disabled
                      />
                      <CInput
                        label="duf"
                        placeholder="duf"
                        v-model="address.duf_su"
                        disabled
                      />
                      <CInput
                        label="civico"
                        placeholder="civico"
                        v-model="address.civico_su"
                        disabled
                      />
                      <CInput
                        label="esponente"
                        placeholder="esponente"
                        v-model="address.esponente_su"
                        disabled
                      />
                    </CCardBody>
                  </CCard>
                  <CCardFooter>
                    <CButton
                      shape="square"
                      size="sm"
                      color="primary"
                      class="mr-2"
                      @click="goNextTab"
                      >Next -></CButton
                    >
                  </CCardFooter>
                </div>
              </div>
            </CTab>

            <CTab title="Dati di output">
              <CCard>
                <CCardHeader>dati riepilogativi di input</CCardHeader>
                <CCardBody>
                  <CInput
                    label="indirizzo originario"
                    placeholder="indirizzo originario"
                    v-model="original"
                    disabled
                  />
                  <CInput
                    label="indirizzo normalizato"
                    placeholder="indirizzo normalizzato"
                    v-model="normalized"
                    disabled
                  />
                </CCardBody>
              </CCard>
              <CCard>
                <CCardHeader
                  >Indirizzo revisionato
                  <label
                    class="c-switch form-check-label c-switch-pill c-switch-success"
                    ><input
                      type="checkbox"
                      :checked="validated"
                      @click="toggle"
                      class="c-switch-input form-check-input"/>
                    <span class="c-switch-slider"></span></label
                ></CCardHeader>
                <CCardBody>
                  <CInput
                    label="dug"
                    placeholder="dug"
                    :class="{
                      'is-invalid': $v.address.dug.$error
                    }"
                    v-model="address.dug"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{
                      show: $v.address.dug.$error
                    }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="duf"
                    placeholder="duf"
                    :class="{
                      'is-invalid': $v.address.duf.$error
                    }"
                    v-model="address.duf"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{
                      show: $v.address.duf.$error
                    }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="civico"
                    placeholder="civico"
                    :class="{
                      'is-invalid': $v.address.civico.$error
                    }"
                    v-model="address.civico"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.civico.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="località"
                    placeholder="località"
                    :class="{
                      'is-invalid': $v.address.localita.$error
                    }"
                    v-model="address.localita"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.localita.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="esponente"
                    placeholder="esponente"
                    :class="{
                      'is-invalid': $v.address.esponente.$error
                    }"
                    v-model="address.esponente"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.esponente.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="codice strada"
                    placeholder="codice strada"
                    :class="{
                      'is-invalid': $v.address.chiave_strada.$error
                    }"
                    v-model="address.chiave_strada"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.chiave_strada.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="codice civico"
                    placeholder="codice civico"
                    :class="{
                      'is-invalid': $v.address.chiave_civico.$error
                    }"
                    v-model="address.chiave_civico"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.chiave_civico.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="fonte"
                    placeholder="fonte"
                    :class="{
                      'is-invalid': $v.address.fonte.$error
                    }"
                    v-model="address.fonte"
                    v-show="revisionato"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.fonte.$error }"
                  >
                    This field is required
                  </div>
                </CCardBody>
              </CCard>
            </CTab>
          </CTabs>
        </CCardBody>
        <CCardFooter>
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mr-2"
            @click.prevent="handleSubmit"
            >Save</CButton
          >
          <CButton
            shape="square"
            size="sm"
            color="light"
            @click.prevent="backToList"
            >Close</CButton
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
  data() {
    return {
      revisionato: {}
    };
  },
  computed: {
    ...mapGetters("addressServ", { address: "addressService" }),
    ...mapGetters("addressServ", { original: "addressOriginal" }),
    ...mapGetters("addressServ", { normalized: "addressNormalized" }),
    ...mapGetters("addressServ", { validated: "addressValidated" })
  },
  validations: {
    address: {
      localita_su: {
        required
      },
      dug_su: {
        required
      },
      duf_su: {
        required
      },
      civico_su: {
        required
      },
      esponente_su: {
        required
      },
      localita: {
        required
      },
      dug: {
        required
      },
      duf: {
        required
      },
      civico: {
        required
      },
      esponente: {
        required
      },
      chiave_strada: {
        required
      },
      chiave_civico: {
        required
      },
      fonte: {
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
    },
    goNextTab() {
      this.$refs.tabs.activeTabIndex = 1;
    },
    toggle(element) {
      if (element.currentTarget.checked) {
        this.address.validazione = "SI";
        this.revisionato = true;
      }
      if (!element.currentTarget.checked) {
        this.address.validazione = "NO";
        this.revisionato = false;
      }
    }
  },
  created() {
    this.$store.dispatch("addressServ/findById", this.$route.params.id);
    this.revisionato = this.validated;
  }
};
</script>