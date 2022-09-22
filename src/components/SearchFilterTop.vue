<template>
  <div class="card fade-in">
    <CCardHeader
      ><span class="filter-head">Filtri di ricerca</span></CCardHeader
    >
    <CCardBody>
      <div class="row">
        <div class="col-4">
          <v-select
            v-if="comuni"
            label="denominazioneComune"
            :options="comuni"
            placeholder="Tutti i comuni"
            v-model="comune"
          ></v-select>
        </div>
        <div class="col-4">
          <CInput placeholder="Toponimo" v-model="toponimo" />
        </div>
        <div class="col-2">
          <v-select
            v-if="stato == 2"
            label="value"
            :options="validazioneValues"
            v-model="validazione"
            placeholder="Validazione"
          ></v-select>
        </div>
        <div class="col-2">
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mt-1"
            @click="$emit('filter')"
            >Filtra</CButton
          >
        </div>
      </div>
    </CCardBody>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ValidazioneMixin from "@/components/mixins/validazione.mixin";
export default {
  name: "SearchFilterTop",
  props: {
    stato: null
  },
  mixins: [ValidazioneMixin],
  computed: {
    ...mapGetters("elencoComuni", ["comuni"]),
    ...mapGetters("toponimo", [
      "filterComune",
      "filterAddress",
      "filterValidazione"
    ]),
    comune: {
      get: function() {
        return this.filterComune;
      },
      set: function(selectedComune) {
        this.$store.dispatch("toponimo/setFilterComune", selectedComune);
      }
    },
    indirizzo: {
      get: function() {
        return this.filterAddress;
      },
      set: function(selectedToponimo) {
        this.$store.dispatch("toponimo/setFilterAddress", selectedToponimo);
      }
    },
    validazione: {
      get: function() {
        return this.filterValidazione;
      },
      set: function(selectedValidazione) {
        this.$store.dispatch(
          "toponimo/setFilterValidazione",
          selectedValidazione
        );
      }
    }
  }
};
</script>

<style scoped>
.filter-head {
  font-weight: 600;
}
</style>
