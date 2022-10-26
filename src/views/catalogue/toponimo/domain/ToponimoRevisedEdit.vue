<template>
  <CCard>
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Toponimo revisionato</span>
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
        v-model="toponimo.localitaVal"
      />
      <label>Dug*</label>
      <v-select
        :options="dugNames"
        v-model="toponimo.dugVal"
        placeholder="Dug"
        :class="{
          'is-invalid': $v.toponimo.dugVal.$error
        }"
      ></v-select>
      <CInput
        label="Duf*"
        placeholder="Duf"
        v-model="toponimo.dufVal"
        :class="{
          'is-invalid': $v.toponimo.dufVal.$error
        }"
      />
      <template>
        <CInput
          label="Codice strada*"
          placeholder="Codice strada"
          v-model="toponimo.cdpstrVal"
          :class="{
            'is-invalid': $v.toponimo.cdpstrVal.$error
          }"
        />
        <p class="error" v-if="!$v.toponimo.cdpstrVal.validationRuleStr">
          I valori possibili per questo campo sono soltanto numerici e lunghi
          massimo 12 caratteri
        </p>
      </template>
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
export default {
  name: "ToponimoRevisedEdit",
  props: {
    toponimo: {
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
    }
  },
  validations: {
    toponimo: {
      dugVal: {
        required
      },
      dufVal: {
        required
      },
      cdpstrVal: {
        validationRuleStr() {
          return (
            /^[0-9?]*$/.test(this.toponimo.cdpstrVal) ||
            /^[null]/.test(this.toponimo.cdpstrVal)
          );
        },
        maxLength: maxLength(12)
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (
        !this.$v.toponimo.$invalid
        //!this.$v.fonteLocal.$invalid
        //!this.$v.fittizioLocal.$invalid
      ) {
        /* this.toponimo.idFonte = this.fonteLocal.id;
        this.toponimo.fittizio = this.fittizioLocal.id; */
        /* if (!this.isFonteEgon) {
          this.toponimo.cdpstrVal = null;
          this.toponimo.cdpcivVal = null;
        } */
        this.$emit("revise", this.toponimo);
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
