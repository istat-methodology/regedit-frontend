<template>
  <div class="card fade-in">
    <CCardHeader
      ><span class="filter-head">Filtri di ricerca</span></CCardHeader
    >
    <CCardBody>
      <div class="row">
        <div class="col-2">
          <v-select
            v-if="province"
            label="denominazioneProvincia"
            :options="province"
            placeholder="Tutte le Province"
            v-model="provincia"
          ></v-select>
        </div>
        <div class="col-2">
          <v-select
            v-if="comuni"
            label="denominazioneComune"
            :options="comuni"
            placeholder="Tutti i comuni"
            v-model="comune"
          ></v-select>
        </div>
        <div class="col-2">
          <CInput placeholder="Toponimo" v-model="toponimo" />
        </div>
        <div class="col-2">
          <CInput placeholder="Soglia" v-model="soglia" />
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
          <CButton
            style="margin-left: 20px"
            shape="square"
            size="sm"
            color="success"
            class="mt-1"
            @click="$emit('validate')"
            >Valida Tutti</CButton
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
  /*  data: function() {
    return {
      soglia: ""
    };
  }, */
  props: {
    stato: null
  },
  mixins: [ValidazioneMixin],
  computed: {
    ...mapGetters("elencoComuni", ["comuni"]),
    ...mapGetters("elencoProvince", ["province"]),
    ...mapGetters("toponimo", [
      "filterTopComune",
      "filterTopProvincia",
      "filterToponimo",
      "filterTopValidazione",
      "filterTopSoglia"
    ]),
    comune: {
      get: function() {
        return this.filterTopComune;
      },
      set: function(selectedComune) {
        this.$store.dispatch("toponimo/setFilterTopComune", selectedComune);
      }
    },
    soglia: {
      get: function() {
        return this.filterTopSoglia;
      },
      set: function(selectedSoglia) {
        this.$store.dispatch("toponimo/setFilterTopSoglia", selectedSoglia);
      }
    },

    provincia: {
      get: function() {
        return this.filterTopProvincia;
      },
      set: function(selectedProvincia) {
        this.$store.dispatch(
          "toponimo/setFilterTopProvincia",
          selectedProvincia
        );
      }
    },
    toponimo: {
      get: function() {
        return this.filterToponimo;
      },
      set: function(selectedToponimo) {
        this.$store.dispatch("toponimo/setFilterToponimo", selectedToponimo);
      }
    },
    validazione: {
      get: function() {
        return this.filterTopValidazione;
      },
      set: function(selectedValidazione) {
        this.$store.dispatch(
          "toponimo/setFilterTopValidazione",
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
