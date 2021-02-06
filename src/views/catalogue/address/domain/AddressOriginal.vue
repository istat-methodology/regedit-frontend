<template>
  <CCard v-if="address">
    <CCardHeader class="card-header-light-grey">
      <span class="card-header-span">Indirizzo originale</span>
      <div
        class="card-header-actions"
        v-if="address.stato == addressState.Revised"
      >
        <CButton shape="square" size="sm" color="primary" @click="$emit('open')"
          >Modifica</CButton
        >
      </div>
      <div class="card-header-actions" v-else>
        <CButton shape="square" size="sm" color="warning" @click="$emit('skip')"
          >Sospendi</CButton
        >
      </div>
    </CCardHeader>
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ addressPrint }}</span>
      </div>
      <div>
        <label>Progressivo</label>
        <span>{{ address.progressivoIndirizzo | dashEmpty }}</span>
      </div>
      <div>
        <label>Procom</label>
        <span>{{ address.proCom | dashEmpty }}</span>
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
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressOriginal",
  mixins: [addressMixin],
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    addressPrint() {
      return this.printAddress(this.address, this.addressType.Original);
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
