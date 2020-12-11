<template>
  <CCard class="card-accent-primary" v-if="address">
    <CCardHeader class="card-header-light-grey">
      <span class="card-header-span">Indirizzo originale</span>
    </CCardHeader>
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressString }}</span>
      </div>
      <div>
        <label>Comune</label>
        <span>{{ address.denominazioneComune | dashEmpty }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ address.localitaOriginale | dashEmpty }}</span>
      </div>
      <div>
        <label>Indirizzo</label>
        <span>{{ address.indirizzoOriginale | dashEmpty }}</span>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import { Address, printAddress } from "@/common";

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
      return this.printAddress(this.address, Address.Original);
    }
  },
  methods: {
    printAddress
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
