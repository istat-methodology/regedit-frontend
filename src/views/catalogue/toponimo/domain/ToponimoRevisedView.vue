<template>
  <CCard>
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
    <CCardBody class="card-text" :class="{ colordisabled: validated }">
      <div>
        <span class="mb-2">{{ toponimoPrint }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ toponimo.localitaVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Dug</label>
        <span>{{ toponimo.dugVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Duf</label>
        <span>{{ toponimo.dufVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Civico</label>
        <span>{{ toponimo.civicoVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Km</label>
        <span>{{ toponimo.kmVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Esponente</label>
        <span>{{ toponimo.esponenteVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Fonte</label>
        <span>{{ fonte | dashEmpty }}</span>
      </div>
      <div>
        <label>Codice strada</label>
        <span>{{ toponimo.cdpstrEgon | dashEmpty }}</span>
      </div>
      <div>
        <label>Codice civico</label>
        <span>{{ toponimo.cdpcivEgon | dashEmpty }}</span>
      </div>
      <div>
        <label>Fittizio</label>
        <span>{{ fittizio | dashEmpty }}</span>
      </div>
      <!-- <div>
        <label>Note</label>
        <span>{{ toponimo.note | dashEmpty }}</span>
      </div> -->
    </CCardBody>
  </CCard>
</template>
<script>
import toponimoMixin from "@/components/mixins/toponimo.mixin";
import fonteMixin from "@/components/mixins/fonte.mixin";
import fittizioMixin from "@/components/mixins/fittizio.mixin";

export default {
  name: "AddressRevisedView",
  mixins: [toponimoMixin, fonteMixin, fittizioMixin],
  props: {
    toponimo: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    validated() {
      return this.isAddressValidated(this.toponimo);
    },
    toponimoPrint() {
      return this.printAddress(this.toponimo, this.toponimoType.Revised);
    },
    fonte() {
      const addrFonte = this.getFonteById(this.toponimo.idFonte);
      return addrFonte ? addrFonte.fonte : "";
    },
    fittizio() {
      const topFittizio = this.getFittizioById(this.toponimo.fittizio);
      return topFittizio ? topFittizio.value : "";
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
  color: #9da5b1;
}
</style>
