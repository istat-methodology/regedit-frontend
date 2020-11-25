<template>
  <CCard
    :class="{
      'bg-gradient-primary text-white': !address.validato,
      'bg-gradient-secondary': address.validato
    }"
    v-if="address"
  >
    <CCardHeader>
      <span class="card-header-span">Indirizzo originale</span>
    </CCardHeader>
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressString }}</span>
      </div>
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
        <span>{{ address.indirizzo_originale | dashEmpty }}</span>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "AddressOriginal",
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
