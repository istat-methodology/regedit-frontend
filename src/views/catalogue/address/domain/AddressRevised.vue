<template>
  <CCard class="card-accent-danger" v-if="address.validazione == 'SI'">
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
        <label>Localita</label>
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
      <div class="card-header-actions" v-if="address.validazione == 'NO'">
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
        label="Codice strada*"
        placeholder="Codice strada"
        v-model="address.cdpstrEgon"
      />
      <CInput
        label="Codice civico*"
        placeholder="Codice civico"
        v-model="address.cdpcivEgon"
      />
      <CInput label="Fonte*" placeholder="Fonte" v-model="address.idFonte" />
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
      dugvalue: null
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
      localitaVal: {
        required
      },
      dugVal: {
        required
      },
      dufVal: {
        required
      },
      civicoVal: {
        required
      },
      esponenteVal: {
        required,
        validationRule(esponente) {
          return (
            /^[a-zA-Z?]$/.test(esponente) ||
            /^[0-9?]*$/.test(esponente) ||
            /(BIS|TER|QUATER|QUINQUIES|SEXIES|SEPTIES)\b/.test(esponente) ||
            /^[a-zA-Z?](R|ROSSO)$/.test(esponente) ||
            /^[0-9?]*(R|ROSSO)$/.test(esponente) ||
            /(BIS|TER|QUATER|QUINQUIES|SEXIES|SEPTIES)(R|ROSSO)\b/.test(
              esponente
            )
          );
        }
      }
    }
  },
  methods: {
    printAddress,
    handleSelectInput(input) {
      this.address.dug = input.name;
    },
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.address.$invalid) {
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
</style>
