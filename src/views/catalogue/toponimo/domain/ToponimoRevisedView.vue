<template>
  <CCard>
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo revisionato</span></CCardHeader
    >
    <CCardBody class="card-text" :class="{ colordisabled: validated }">
      <div>
        <span class="mb-2">{{ addressPrint }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ address.localitaVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Dug</label>
        <span>{{ address.dugVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Duf</label>
        <span>{{ address.dufVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Civico</label>
        <span>{{ address.civicoVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Km</label>
        <span>{{ address.kmVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Esponente</label>
        <span>{{ address.esponenteVal | dashEmpty }}</span>
      </div>
      <div>
        <label>Fonte</label>
        <span>{{ fonte | dashEmpty }}</span>
      </div>
      <div>
        <label>Codice strada</label>
        <span>{{ address.cdpstrEgon | dashEmpty }}</span>
      </div>
      <div>
        <label>Codice civico</label>
        <span>{{ address.cdpcivEgon | dashEmpty }}</span>
      </div>
      <div>
        <label>Fittizio</label>
        <span>{{ fittizio | dashEmpty }}</span>
      </div>
      <!-- <div>
        <label>Note</label>
        <span>{{ address.note | dashEmpty }}</span>
      </div> -->
    </CCardBody>
  </CCard>
</template>
<script>
import addressMixin from "@/components/mixins/address.mixin";
import fonteMixin from "@/components/mixins/fonte.mixin";
import fittizioMixin from "@/components/mixins/fittizio.mixin";

export default {
  name: "AddressRevisedView",
  mixins: [addressMixin, fonteMixin, fittizioMixin],
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    validated() {
      return this.isAddressValidated(this.address);
    },
    addressPrint() {
      return this.printAddress(this.address, this.addressType.Revised);
    },
    fonte() {
      const addrFonte = this.getFonteById(this.address.idFonte);
      return addrFonte ? addrFonte.fonte : "";
    },
    fittizio() {
      const addrFittizio = this.getFittizioById(this.address.fittizio);
      return addrFittizio ? addrFittizio.value : "";
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
