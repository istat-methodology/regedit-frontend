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
            @input="changedValueProvincia"
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
        <div class="col-1">
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mt-1"
            @click="$emit('filter')"
            >Filtra</CButton
          >
        </div>
        <!--  <div class="col-1">
          <CButton
            v-if="stato == 2"
            shape="square"
            size="sm"
            color="none"
            class="mt-1"
            @click="$emit('export')"
            >CSV</CButton
          >
        </div> -->
        <div class="col-1">
          <CButton
            style="margin-left: 20px"
            v-if="stato == 1"
            shape="square"
            size="sm"
            color="success"
            class="mt-1"
            @click="$emit('validate')"
            >Valida</CButton
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
  methods: {
    changedValueProvincia: function() {
      //alert("A new value was selected");
      let provinciaSelected = null;

      if (this.filterTopProvincia) {
        provinciaSelected = this.filterTopProvincia.denominazioneProvincia;
      }

      let payload = {
        state: this.$route.params.state,
        provincia: provinciaSelected
      };
      this.$store.dispatch("elencoComuni/findTopComuniByUserAndState", payload);
    }
  },
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
        let topValue = null;
        if (selectedToponimo != "") {
          topValue = selectedToponimo;
        }

        this.$store.dispatch("toponimo/setFilterToponimo", topValue);
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
