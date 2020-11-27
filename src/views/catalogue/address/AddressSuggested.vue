<template>
  <CCard class="card-accent-success" v-if="address">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo suggerito</span>
      <div class="card-header-actions" v-if="!address.validato">
        <CButton shape="square" size="sm" color="success" @click="handleSubmit"
          >Valida</CButton
        >
      </div>
    </CCardHeader>
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressString }}</span>
      </div>
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
      <template v-if="address.validato">
        <div>
          <label>Nota</label>
          <span>{{ address.nota_su | dashEmpty }}</span>
        </div>
      </template>
      <template v-else>
        <CTextarea
          rows="3"
          label="Note"
          v-model="address.nota_su"
          v-if="!address.validato"
        />
      </template>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "AddressSuggested",
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    addressString() {
      var addr = "";
      if (this.address) {
        addr = this.address.dug_su
          .concat(this.address.duf_su ? " " + this.address.duf_su : "")
          .concat(this.address.civico_su ? " " + this.address.civico_su : "")
          .concat(
            this.address.esponente_su ? " " + this.address.esponente_su : ""
          )
          .concat(
            this.address.localita_su ? ", " + this.address.localita_su : ""
          );
      }
      return addr;
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("validate", this.address);
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
.btn-header-success {
  background-color: #fff;
  color: #2eb85c;
  font-weight: 600;
  padding: 0.1rem 0.5rem;
}
.btn-header-success:hover {
  background-color: #2eb85c;
  border-color: #2eb85c;
  color: #fff;
  padding: 0.1rem 0.5rem;
}
</style>
