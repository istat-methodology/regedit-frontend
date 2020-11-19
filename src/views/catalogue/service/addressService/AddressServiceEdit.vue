<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="address">
    <div class="col-12">
      <CCard>
        <CCardHeader>Address</CCardHeader>
        <CCardBody>
          <CTabs variant="Indirizzo" :active-tab="0">
            <CTab title="Dati di input">
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
              <CCard>
                <CCardHeader>Indirizzo normalizzato</CCardHeader>
                <CCardBody>
                  <CInput
                    label="località"
                    placeholder="località"
                    :class="{
                      'is-invalid': $v.address.localita_su.$error
                    }"
                    v-model="address.localita_su"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.localita_su.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="dug"
                    placeholder="dug"
                    :class="{
                      'is-invalid': $v.address.dug_su.$error
                    }"
                    v-model="address.dug_su"
                  />
                  <div
                    class="help-block"
                    :class="{
                      show: $v.address.dug_su.$error
                    }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="duf"
                    placeholder="duf"
                    :class="{
                      'is-invalid': $v.address.duf_su.$error
                    }"
                    v-model="address.duf_su"
                  />
                  <div
                    class="help-block"
                    :class="{
                      show: $v.address.duf_su.$error
                    }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="civico"
                    placeholder="civico"
                    :class="{
                      'is-invalid': $v.address.civico_su.$error
                    }"
                    v-model="address.civico_su"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.civico_su.$error }"
                  >
                    This field is required
                  </div>
                  <CInput
                    label="esponente"
                    placeholder="esponente"
                    :class="{
                      'is-invalid': $v.address.esponente_su.$error
                    }"
                    v-model="address.esponente_su"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.address.esponente_su.$error }"
                  >
                    This field is required
                  </div>
                </CCardBody>
              </CCard>
            </CTab>

            <CTab title="Dati di output">
              <CCard>
                <CCardHeader>dati riepilogativi di input</CCardHeader>
                <CCardBody>
                  <CInput
                    label="indirizzo originario"
                    placeholder="indirizzo originario"
                    disabled
                  />
                  <CInput
                    label="indirizzo normalizato"
                    placeholder="indirizzo normalizzato"
                    disabled
                  />
                </CCardBody>
              </CCard>
              <CCard>
                <CCardHeader>Indirizzo revisionato</CCardHeader>
                <CCardBody>
                  <CInput
                    label="dug"
                    placeholder="dug"
                    :class="{
                      'is-invalid': $v.address.dug.$error
                    }"
                    v-model="address.dug"
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
    ...mapGetters("addressServ", { address: "addressService" })
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
    }
  },
  created() {
    this.$store.dispatch("addressServ/findById", this.$route.params.id);
  }
};
</script>
