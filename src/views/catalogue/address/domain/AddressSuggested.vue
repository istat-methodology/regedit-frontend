<template>
  <CCard v-if="address">
    <CCardHeader class="card-header-light-grey"
      ><span class="card-header-span">Indirizzo suggerito</span>
      <div
        class="card-header-actions"
        v-if="!(address.stato === addressState.Revised)"
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
        colordisabled: !validated && address.stato === addressState.Revised
      }"
    >
      <div>
        <span class="mb-2">{{ addressPrint }}</span>
      </div>
      <div>
        <label>Località</label>
        <span>{{ address.localitaNorm | dashEmpty }}</span>
      </div>
      <div>
        <label>Dug</label>
        <span>{{ address.dugNorm | dashEmpty }}</span>
      </div>
      <div>
        <label>Duf</label>
        <span>{{ address.dufNorm | dashEmpty }}</span>
      </div>
      <div>
        <label>Civico</label>
        <span>{{ address.civicoNorm | dashEmpty }}</span>
      </div>
      <div>
        <label>Esponente</label>
        <span>{{ address.esponenteNorm | dashEmpty }}</span>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import addressMixin from "@/components/mixins/address.mixin";

export default {
  name: "AddressSuggested",
  mixins: [addressMixin],
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    addressPrint() {
      return this.printAddress(this.address, this.addressType.Suggested);
    },
    validated() {
      return this.isAddressValidated(this.address);
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
