<template>
  <CCard class="card-accent-danger" v-if="address.stato == 2">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressString }}</span>
      </div>
      <div>
        <label>Dug</label>
        <span>{{ address.dugVal }}</span>
      </div>
      <div>
        <label>Duf</label>
        <span>{{ address.dufVal }}</span>
      </div>
      <div>
        <label>Civico</label>
        <span>{{ address.civicoVal }}</span>
      </div>
      <div>
        <label>Km</label>
        <span>{{ address.kmVal }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ address.localitaVal }}</span>
      </div>
      <div>
        <label>Esponente</label>
        <span>{{ address.esponenteVal }}</span>
      </div>
      <div>
        <label>Codice strada</label>
        <span>{{ address.cdpstrEgon }}</span>
      </div>
      <div>
        <label>Codice civico</label>
        <span>{{ address.cdpcivEgon }}</span>
      </div>
      <div>
        <label>Fonte</label>
        <span>{{ address.idFonte }}</span>
      </div>
    </CCardBody>
  </CCard>
  <CCard class="card-accent-danger" v-else>
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span>
      <div class="card-header-actions">
        <CButton shape="square" size="sm" color="danger" @click="handleSubmit"
          >Revisiona</CButton
        >
      </div></CCardHeader
    >
    <CCardBody class="card-text">
      <label>Dug*</label>
      <v-select
        label="name"
        :options="dugs"
        v-model="address.dugVal"
        @input="handleSelectInput"
        placeholder="Dug"
        :class="{
          'is-invalid': $v.address.dugVal.$error
        }"
      ></v-select>
      <CInput
        label="Duf*"
        placeholder="Duf"
        :class="{
          'is-invalid': $v.address.dufVal.$error
        }"
        v-model="address.dufVal"
      />
      <CInput
        label="Civico*"
        placeholder="Civico"
        :class="{
          'is-invalid': $v.address.civicoVal.$error
        }"
        v-model="address.civicoVal"
      />
      <p class="error" v-if="!$v.address.civicoVal.validationRuleCivico">
        I valori possibili per questo campo sono soltanto numerici
      </p>
      <CInput label="Km" placeholder="Km" v-model="address.kmVal" />
      <CInput
        label="Località"
        placeholder="Località"
        :class="{
          'is-invalid': $v.address.localitaVal.$error
        }"
        v-model="address.localitaVal"
      />
      <CInput
        label="Esponente*"
        placeholder="Esponente"
        :class="{
          'is-invalid': $v.address.esponenteVal.$error
        }"
        v-model="address.esponenteVal"
      />
      <p class="error" v-if="!$v.address.esponenteVal.validationRule">
        I valori possibili per questo campo sono: · Non valorizzato. . Numerico
        Un solo carattere alfabetico.
        ·'BIS','TER','QUATER','QUINQUIES','SEXIES','SEPTIES’ · Tutte le
        casistiche precedenti seguite da ' R' o ' ROSSO'
      </p>
      <CInput
        v-if="this.idfonte == 1"
        label="Codice strada*"
        placeholder="Codice strada"
        :class="{
          'is-invalid': $v.address.cdpstrEgon.$error
        }"
        v-model="address.cdpstrEgon"
      />
      <p class="error" v-if="!$v.address.cdpstrEgon.validationRuleStrEgon">
        I valori possibili per questo campo sono soltanto numerici
      </p>
      <CInput
        v-if="this.idfonte == 1"
        label="Codice civico*"
        placeholder="Codice civico"
        :class="{
          'is-invalid': $v.address.cdpcivEgon.$error
        }"
        v-model="address.cdpcivEgon"
      />
      <p class="error" v-if="!$v.address.cdpcivEgon.validationRuleCivEgon">
        I valori possibili per questo campo sono soltanto numerici
      </p>
      <!-- <CInput label="Fonte*" placeholder="Fonte" v-model="address.idFonte" /> -->
      <label>Fonte</label>
      <v-select
        label="fonte"
        :options="fonteValues"
        v-model="address.idFonte"
        @input="handleSelectFonte"
        placeholder="Fonte"
        :class="{
          'is-invalid': $v.address.idFonte.$error
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
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { Address, printAddress } from "@/common";

export default {
  name: "AddressRevised",
  data: function() {
    return {
      dugvalue: null,
      idfonte: null,
      fonteValues: [
        {
          id: 1,
          fonte: "Egon"
        },
        {
          id: 2,
          fonte: "Google Maps"
        },
        {
          id: 3,
          fonte: "Revisore"
        }
      ]
    };
  },
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapGetters("dug", ["dugs"]),
    addressString() {
      return this.printAddress(this.address, Address.Revised);
    }
  },
  validations: {
    address: {
      localitaVal: {},
      dugVal: {
        required
      },
      dufVal: {},
      civicoVal: {
        validationRuleCivico(civicoVal) {
          return /^[0-9?]*$/.test(civicoVal) || /^[null]/.test(civicoVal);
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
        validationRuleStrEgon(cdpstrEgon) {
          return /^[0-9?]*$/.test(cdpstrEgon) || /^[null]/.test(cdpstrEgon);
        }
      },
      cdpcivEgon: {
        validationRuleCivEgon(cdpcivEgon) {
          return /^[0-9?]*$/.test(cdpcivEgon) || /^[null]/.test(cdpcivEgon);
        }
      },
      idFonte: {
        required
      }
    }
  },
  methods: {
    printAddress,
    handleSelectInput(input) {
      this.dugvalue = input.name;
    },
    handleSelectFonte(input) {
      this.idfonte = input.id;
      //this.address.idFonte = input.id;
    },
    handleSubmit() {
      var addr = {
        ...this.address,
        dugVal: this.dugvalue,
        idFonte: this.idfonte
      };
      this.$v.$touch(); //validate form data
      if (!this.$v.address.$invalid) {
        this.address.dugVal = this.dugvalue;
        this.address.idFonte = this.idfonte;
        this.$emit("revise", addr);
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
</style>
