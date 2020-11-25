<template>
  <CCard
    :class="{
      'bg-gradient-success text-white': !address.validato,
      'bg-gradient-secondary': address.validato
    }"
    v-if="address"
  >
    <CCardHeader
      ><span class="card-header-span">Indirizzo suggerito</span>
      <div class="card-header-actions">
        <CButtonGroup v-if="!address.validato && !address.revisionato">
          <CButton
            shape="square"
            size="sm"
            variant="ghost"
            color="light"
            class="btn-header-success mr-2"
            @click.prevent="$emit('validate')"
            >Valida</CButton
          >
          <CButton
            shape="square"
            size="sm"
            variant="ghost"
            color="light"
            class="btn-header-success"
            @click.prevent="$emit('revise')"
            >Revisiona</CButton
          >
        </CButtonGroup>
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
      if (this.address != null) {
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
