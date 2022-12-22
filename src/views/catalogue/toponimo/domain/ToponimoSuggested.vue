<template>
  <CCard v-if="toponimo">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Toponimo suggerito</span>
      <div
        class="card-header-actions"
        v-if="!(toponimo.stato === toponimoState.Revised)"
      >
        <CButton
          shape="square"
          size="sm"
          color="success"
          @click="$emit('validate')"
          >Valida</CButton
        >
      </div>
    </CCardHeader>
    <CCardBody
      class="card-text"
      :class="{
        colordisabled: !validated && toponimo.stato === toponimoState.Revised
      }"
    >
      <div>
        <span class="mb-2">{{ toponimoPrint }}</span>
      </div>
      <div>
        <label>Località Suggerita</label>
        <span>{{ toponimo.localitaProb | dashEmpty }}</span>
      </div>
      <div>
        <label>Dug Suggerito</label>
        <span>{{ toponimo.dugProb | dashEmpty }}</span>
      </div>
      <div>
        <label>Duf Suggerito</label>
        <span>{{ toponimo.dufProb | dashEmpty }}</span>
      </div>
      <div>
        <label>Codice strada</label>
        <span>{{ toponimo.cdpstrProb | dashEmpty }}</span>
      </div>
      <div>
        <label>Soglia</label>
        <span>{{ toponimo.sogliaW | dashEmpty }}</span>
      </div>
      <div>
        <label>DNC</label>
        <span>{{ toponimo.dnc | dashEmpty }}</span>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import toponimoMixin from "@/components/mixins/toponimo.mixin";

export default {
  name: "ToponimoSuggested",
  mixins: [toponimoMixin],
  props: {
    toponimo: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    toponimoPrint() {
      return this.printToponimo(this.toponimo, this.toponimoType.Suggested);
    },
    validated() {
      return this.isToponimoValidated(this.toponimo);
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
.colordisabled {
  color: #9da5b1;
}
</style>
