<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <CCard v-if="address">
        <CCardHeader
          >{{ original }}
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
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-2', content: 'col-md-10' }"
            :active-tab="activeTab"
            :fade="false"
            @update:activeTab="updateTab"
            ref="tabs"
          >
            <CTab title="Dati di input">
              <div class="row">
                <div class="col-6">
                  <CCard class="bg-gradient-primary text-white">
                    <CCardHeader>Indirizzo registro</CCardHeader>
                    <CCardBody class="card-text">
                      <div>
                        <label>Comune</label>
                        <span>{{ address.comune_or | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Località</label>
                        <span>{{ address.localita_or | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Indirizzo</label>
                        <span>{{
                          address.indirizzo_originale | dashEmpty
                        }}</span>
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
                <div class="col-6">
                  <CCard class="bg-gradient-success text-white">
                    <CCardHeader>Indirizzo normalizzato</CCardHeader>
                    <CCardBody class="card-text">
                      <div>
                        <label>Località</label>
                        <span>{{ address.localita_su | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Dug</label>
                        <span>{{ address.dug_su | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Duf</label>
                        <span>{{ address.duf_su | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Civico</label>
                        <span>{{ address.civico_su | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Esponente</label>
                        <span>{{ address.esponente_su | dashEmpty }}</span>
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
              </div>
            </CTab>
            <CTab title="Dati di output">
              <div class="row">
                <div class="col-6">
                  <CCard class="bg-gradient-primary text-white">
                    <CCardHeader
                      >Dati riepilogativi di input
                      <div class="card-header-actions">
                        <CSwitch
                          size="sm"
                          color="success"
                          variant="opposite"
                          :checked="validated"
                          @update:checked="toggle"
                        /></div
                    ></CCardHeader>
                    <CCardBody class="card-text">
                      <div>
                        <label>Indirizzo originario</label>
                        <span>{{ original | dashEmpty }}</span>
                      </div>
                      <div>
                        <label>Indirizzo normalizzato</label>
                        <span>{{ normalized | dashEmpty }}</span>
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
                <div class="col-6">
                  <CCard class="card-no-border" v-show="revisionato">
                    <CCardHeader>Indirizzo revisionato </CCardHeader>
                    <CCardBody>
                      <CInput
                        label="dug"
                        placeholder="dug"
                        class="mt-3"
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
                </div>
              </div>
            </CTab>
          </CTabs>
        </CCardBody>
        <CCardFooter>
          <CButtonGroup>
            <CButton
              v-if="activeTab == 0"
              shape="square"
              size="sm"
              color="primary"
              class="btn-next mr-2"
              @click="nextTab"
              >Next<arrow-right-icon
            /></CButton>
            <CButton
              v-else
              shape="square"
              size="sm"
              color="primary"
              class="btn-prev-bottom mr-2"
              @click="prevTab"
              ><arrow-left-icon /> Prev</CButton
            >
            <CButton
              shape="square"
              size="sm"
              color="primary"
              class="mr-2"
              @click.prevent="handleSubmit"
              >Save</CButton
            >
          </CButtonGroup>
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
      validated: "addressValidated",
      addressNext: "addressNext",
      addressPrev: "addressPrev"
    }),
    ...mapGetters("coreui", ["isLoading"])
  },
  validations: {
    address: {
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
      let submit = true;
      if (this.revisionato) {
        this.$v.$touch(); //validate form data
        submit = !this.$v.address.$invalid;
      }
      if (submit) {
        this.$store.dispatch("addressServ/update", this.address).then(() => {
          this.backToList();
        });
      }
    },
    backToList() {
      this.$router.push("/catalogue/address");
    },
    toggle(status) {
      if (status) {
        this.address.validazione = "SI";
        this.revisionato = true;
      }
      if (!status) {
        this.address.validazione = "NO";
        this.revisionato = false;
      }
    },
    nextTab() {
      this.activeTab++;
    },
    prevTab() {
      this.activeTab--;
    },
    updateTab(active) {
      this.activeTab = active;
    },
    prevAddress() {
      this.$store
        .dispatch("addressServ/findById", this.addressPrev.id)
        .then(() => {
          this.revisionato = this.validated;
        });
    },
    nextAddress() {
      this.$store
        .dispatch("addressServ/findById", this.addressNext.id)
        .then(() => {
          this.revisionato = this.validated;
        });
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
.card-text {
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.card-header {
  font-weight: 600;
}
.card-text > div {
  margin-bottom: 0.2rem;
}
.card-text > div > label {
  display: inline-block;
  margin-bottom: 0.2rem;
}
.card-text > div > span {
  display: block;
  width: 100%;
  padding: 0rem;
  padding-bottom: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  background-clip: padding-box;
  border: 0;
  border-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
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
</style>
