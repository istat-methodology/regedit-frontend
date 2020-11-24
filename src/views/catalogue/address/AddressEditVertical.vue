<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="address">
    <div class="col-12">
      <CCard>
        <CCardHeader>Indirizzo</CCardHeader>
        <CCardBody>
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-2', content: 'col-md-10' }"
            :active-tab="activeTab"
            :fade="false"
            @update:activeTab="updateStep"
            ref="tabs"
          >
            <CTab title="Dati di input">
              <div class="row">
                <div class="col-6">
                  <CCard class="bg-gradient-primary text-white">
                    <CCardHeader>Indirizzo registro</CCardHeader>
                    <CCardBody>
                      <div class="form-group-plain">
                        <label for="Codice archivio">Codice archivio</label>
                        <span>{{ address.codice_archivio_or }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Progressivo indirizzo"
                          >Progressivo indirizzo</label
                        >
                        <span>{{ address.progressivo_indirizzo_or }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Comune">Comune</label>
                        <span>{{ address.comune_or }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Località">Località</label>
                        <span>{{ address.localita_or }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Indirizzo">Indirizzo</label>
                        <span>{{ address.indirizzo_originale }}</span>
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
                <div class="col-6">
                  <CCard class="bg-gradient-success text-white">
                    <CCardHeader>Indirizzo normalizzato</CCardHeader>
                    <CCardBody>
                      <div class="form-group-plain">
                        <label for="Località">Località</label>
                        <span>{{ address.localita_su }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Dug">Dug</label>
                        <span>{{ address.dug_su }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Duf">Duf</label>
                        <span>{{ address.duf_su }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Civico">Civico</label>
                        <span>{{ address.civico_su }}</span>
                      </div>
                      <div class="form-group-plain">
                        <label for="Esponente">Esponente</label>
                        <span>{{ address.esponente_su }}</span>
                      </div>
                    </CCardBody>
                  </CCard>
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
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mr-2"
            @click="goNextTab"
            >Next</CButton
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
      activeTab: 0,
      revisionato: {}
    };
  },
  computed: {
    ...mapGetters("addressServ", {
      address: "addressService",
      original: "addressOriginal",
      normalized: "addressNormalized",
      validated: "addressValidated"
    })
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
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    }
  },
  created() {
    this.$store
      .dispatch("addressServ/findById", this.$route.params.id)
      .then(() => {
        this.revisionato = this.validated;
      });
  }
};
</script>

<style scoped>
.card-header {
  font-weight: 600;
}
.form-group-plain {
  margin-bottom: 0.2rem;
}
.form-group-plain > label {
  display: inline-block;
  margin-bottom: 0.2rem;
}
.form-group-plain > span {
  display: block;
  width: 100%;
  padding: 0rem;
  padding-bottom: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  background-color: #fff;
  border-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
