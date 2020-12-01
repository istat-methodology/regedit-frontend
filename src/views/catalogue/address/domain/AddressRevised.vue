<template>
  <CCard class="card-accent-danger" v-if="address.validato">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressString }}</span>
      </div>
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
  <CCard v-else class="card-accent-danger">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span>
      <div class="card-header-actions" v-if="!address.validato">
        <CButton shape="square" size="sm" color="danger" @click="handleSubmit"
          >Revisiona</CButton
        >
      </div></CCardHeader
    >
    <CCardBody class="card-text">
      <!--  <CInput
        label="Dug*"
        placeholder="Dug"
        :class="{
          'is-invalid': $v.address.dug.$error
        }"
        v-model="address.dug"
      /> -->
      <CSelect
        label="Dug*"
        :key="id"
        :value="dug"
        :options="dugs"
        v-model="address.dug"
      />
      <CInput
        label="Duf*"
        placeholder="Duf"
        :class="{
          'is-invalid': $v.address.duf.$error
        }"
        v-model="address.duf"
      />
      <CInput
        label="Civico*"
        placeholder="Civico"
        :class="{
          'is-invalid': $v.address.civico.$error
        }"
        v-model="address.civico"
      />
      <CInput
        label="Località"
        placeholder="Località"
        :class="{
          'is-invalid': $v.address.localita.$error
        }"
        v-model="address.localita"
      />
      <CInput
        label="Esponente*"
        placeholder="Esponente"
        :class="{
          'is-invalid': $v.address.esponente.$error
        }"
        v-model="address.esponente"
      />
      <CInput
        label="Codice strada*"
        placeholder="Codice strada"
        :class="{
          'is-invalid': $v.address.chiave_strada.$error
        }"
        v-model="address.chiave_strada"
      />
      <CInput
        label="Codice civico*"
        placeholder="Codice civico"
        :class="{
          'is-invalid': $v.address.chiave_civico.$error
        }"
        v-model="address.chiave_civico"
      />
      <CInput
        label="Fonte*"
        placeholder="Fonte"
        :class="{
          'is-invalid': $v.address.fonte.$error
        }"
        v-model="address.fonte"
      />
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
export default {
  name: "AddressRevised",
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapGetters("dug", ["dugs"]),
    addressString() {
      var addr = "";
      if (this.address) {
        addr =
          this.address.dug +
          " " +
          this.address.duf +
          " " +
          this.address.civico +
          " " +
          this.address.esponente +
          " " +
          this.address.localita;
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
