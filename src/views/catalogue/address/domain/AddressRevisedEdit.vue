<template>
  <CCard>
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span>
      <div class="card-header-actions">
        <CButton shape="square" size="sm" color="danger" @click="handleSubmit"
          >Revisiona</CButton
        >
      </div></CCardHeader
    >

    <CCardBody class="card-text">
      <CInput
        label="Località"
        placeholder="Località"
        v-model="address.localitaVal"
      />
      <label>Dug*</label>
      <v-select
        :options="dugNames"
        v-model="address.dugVal"
        placeholder="Dug"
        :class="{
          'is-invalid': $v.address.dugVal.$error
        }"
      ></v-select>
      <CInput
        label="Duf*"
        placeholder="Duf"
        v-model="address.dufVal"
        :class="{
          'is-invalid': $v.address.dufVal.$error
        }"
      />
      <CInput
        label="Civico"
        placeholder="Civico"
        v-model="address.civicoVal"
        :class="{
          'is-invalid': $v.address.civicoVal.$error
        }"
      />
      <p class="error" v-if="!$v.address.civicoVal.validationRuleCivico">
        I valori possibili per questo campo sono soltanto numerici
      </p>
      <CInput label="Km" placeholder="Km" v-model="address.kmVal" />
      <CInput
        label="Esponente"
        placeholder="Esponente"
        v-model="address.esponenteVal"
        :class="{
          'is-invalid': $v.address.esponenteVal.$error
        }"
      />
      <p class="error" v-if="!$v.address.esponenteVal.validationRule">
        I valori possibili per questo campo sono: · Non valorizzato. . Numerico
        Un solo carattere alfabetico.
        ·'BIS','TER','QUATER','QUINQUIES','SEXIES','SEPTIES’ · Tutte le
        casistiche precedenti seguite da ' R' o ' ROSSO'
      </p>
      <label>Fonte*</label>
      <v-select
        label="fonte"
        :options="fonteValues"
        v-model="fonteLocal"
        placeholder="Fonte"
        :class="{
          'is-invalid': $v.fonteLocal.$error
        }"
      ></v-select>
      <template v-if="isFonteEgon">
        <CInput
          label="Codice strada*"
          placeholder="Codice strada"
          v-model="address.cdpstrEgon"
          :class="{
            'is-invalid': $v.address.cdpstrEgon.$error
          }"
        />
        <p class="error" v-if="$v.address.cdpstrEgon.$error">
          I valori possibili per questo campo sono soltanto numerici e lunghi
          massimo 12 caratteri
        </p>
        <CInput
          label="Codice civico"
          placeholder="Codice civico"
          v-model="address.cdpcivEgon"
          :class="{
            'is-invalid': $v.address.cdpcivEgon.$error
          }"
        />
        <p class="error" v-if="$v.address.cdpcivEgon.$error">
          I valori possibili per questo campo sono soltanto numerici e lunghi
          massimo 15 caratteri
        </p>
      </template>
      <label>Fittizio*</label>
      <v-select
        label="value"
        :options="fittizioValues"
        v-model="fittizioLocal"
        placeholder="Fittizio"
        :class="{
          'is-invalid': $v.fittizioLocal.$error
        }"
      ></v-select>
    </CCardBody>
    <CCardFooter>
      <CButton shape="square" size="sm" color="danger" @click="handleSubmit"
        >Revisiona</CButton
      >
    </CCardFooter>
  </CCard>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import fonteMixin from "@/components/mixins/fonte.mixin";
import fittizioMixin from "@/components/mixins/fittizio.mixin";

export default {
  name: "AddressRevisedEdit",
  mixins: [fonteMixin, fittizioMixin],
  data: function() {
    return {
      fonteLocal: this.fonte,
      fittizioLocal: this.fittizio
    };
  },
  props: {
    address: {
      type: Object,
      default: () => null
    },
    fonte: {
      type: Object,
      default: () => null
    },
    fittizio: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapGetters("dug", ["dugs"]),
    dugNames() {
      return this.dugs.map(dug => {
        return dug.name;
      });
    },
    isFonteEgon() {
      return this.fonteLocal && this.fonteLocal.id == 1 ? true : false;
    }
  },
  validations: {
    fonteLocal: {
      required
    },
    fittizioLocal: {
      required
    },
    address: {
      dugVal: {
        required
      },
      dufVal: {
        required
      },
      civicoVal: {
        validationRuleCivico(civico) {
          return /^[0-9?]*$/.test(civico) || /^[null]/.test(civico);
        }
      },
      esponenteVal: {
        validationRule(esponente) {
          return (
            /^[a-zA-Z?]$/.test(esponente) ||
            /^[null]/.test(esponente) ||
            /^[0-9?]*$/.test(esponente) ||
            /(BIS|TER|QUATER|QUINQUIES|SEXIES|SEPTIES)\b/.test(esponente) ||
            /^[a-zA-Z?](R|ROSSO)$/.test(esponente) ||
            /^[0-9?]*(R|ROSSO)$/.test(esponente) ||
            /(BIS|TER|QUATER|QUINQUIES|SEXIES|SEPTIES)(R|ROSSO)\b/.test(
              esponente
            )
          );
        }
      },
      cdpstrEgon: {
        validationRuleStrEgon(stradaEgon) {
          return this.isFonteEgon ? /^[0-9?]+$/.test(stradaEgon) : true;
        },
        maxLength: maxLength(12)
      },
      cdpcivEgon: {
        validationRuleCivEgon(civicoEgon) {
          return /^[0-9?]*$/.test(civicoEgon) || /^[null]/.test(civicoEgon);
        },
        maxLength: maxLength(15)
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (
        !this.$v.address.$invalid &&
        !this.$v.fonteLocal.$invalid &&
        !this.$v.fittizioLocal.$invalid
      ) {
        this.address.idFonte = this.fonteLocal.id;
        this.address.fittizio = this.fittizioLocal.id;
        if (!this.isFonteEgon) {
          this.address.cdpstrEgon = null;
          this.address.cdpcivEgon = null;
        }
        this.$emit("revise", this.address);
      }
    }
  }
};
</script>

<style scoped>
.card-header {
  font-weight: 600;
}
.card-header-span {
  line-height: 1.7;
}
.form-control {
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}
.colordisabled {
  color: #ebedef;
}
</style>
