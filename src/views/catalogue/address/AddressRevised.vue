<template>
  <CCard
    class="bg-gradient-secondary"
    v-if="address.validato && address.revisionato"
  >
    <CCardHeader
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
    <CCardBody class="card-text">
      <div>
        <label>Dug</label>
        <span>{{ address.dug }}</span>
      </div>
      <div>
        <label>Duf</label>
        <span>{{ address.duf }}</span>
      </div>
      <div>
        <label>Civico</label>
        <span>{{ address.civico }}</span>
      </div>
      <div>
        <label>Localita</label>
        <span>{{ address.localita }}</span>
      </div>
      <div>
        <label>Esponente</label>
        <span>{{ address.esponente }}</span>
      </div>
      <div>
        <label>Codice strada</label>
        <span>{{ address.chiave_strada }}</span>
      </div>
      <div>
        <label>Codice civico</label>
        <span>{{ address.chiave_civico }}</span>
      </div>
      <div>
        <label>Fonte</label>
        <span>{{ address.fonte }}</span>
      </div>
    </CCardBody>
  </CCard>
  <CCard v-else-if="!address.validato && address.revisionato">
    <CCardHeader
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
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
      <div class="help-block" :class="{ show: $v.address.civico.$error }">
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
      <div class="help-block" :class="{ show: $v.address.localita.$error }">
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
      <div class="help-block" :class="{ show: $v.address.esponente.$error }">
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
      <div class="help-block" :class="{ show: $v.address.fonte.$error }">
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
        >Salva</CButton
      >
    </CCardFooter>
  </CCard>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "AddressRevised",
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    addressString() {
      var addr = "";
      if (this.address != null) {
        addr = this.address.indirizzo_originale
          .concat(
            this.address.localita_or ? ", " + this.address.localita_or : ""
          )
          .concat(this.address.comune_or ? ", " + this.address.comune_or : "");
      }
      return addr;
    }
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
      this.$v.$touch(); //validate form data
      if (!this.$v.address.$invalid) {
        this.$emit("save", this.address);
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
</style>
