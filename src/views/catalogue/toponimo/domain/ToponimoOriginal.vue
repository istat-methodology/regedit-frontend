<template>
  <CCard v-if="toponimo">
    <CCardHeader class="card-header-light-grey">
      <span class="card-header-span">Toponimo originale</span>
      <div
        class="card-header-actions"
        v-if="toponimo.stato == toponimoState.Revised"
      >
        <CButton
          shape="square"
          class="mr-2"
          size="sm"
          color="info"
          @click="$emit('next')"
          >Salta</CButton
        >
        <CButton shape="square" size="sm" color="primary" @click="$emit('open')"
          >Modifica</CButton
        >
      </div>
      <div class="card-header-actions" v-else>
        <CButton
          shape="square"
          class="mr-2"
          size="sm"
          color="info"
          @click="$emit('next')"
          >Salta</CButton
        >
        <CButton shape="square" size="sm" color="warning" @click="$emit('skip')"
          >Sospendi</CButton
        >
      </div>
    </CCardHeader>
    <CCardBody class="card-text">
      <div>
        <span class="mb-2">{{ toponimoPrint }}</span>
      </div>
      <div>
        <label>Progressivo</label>
        <span>{{ toponimo.progressivoIndirizzo | dashEmpty }}</span>
      </div>
      <div>
        <label>Procom</label>
        <span>{{ toponimo.proCom | dashEmpty }}</span>
      </div>
      <div>
        <label>Comune</label>
        <span>{{ toponimo.denominazioneComune | dashEmpty }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ toponimo.localitaOriginale | dashEmpty }}</span>
      </div>
      <div>
        <label>Indirizzo</label>
        <span>{{ toponimo.indirizzoOriginale | dashEmpty }}</span>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import toponimoMixin from "@/components/mixins/toponimo.mixin";

export default {
  name: "ToponimoOriginal",
  mixins: [toponimoMixin],
  props: {
    toponimo: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    toponimoPrint() {
      return this.printToponimo(this.toponimo, this.toponimoType.Original);
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
