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
        <!-- <div class="col-1">
          <label class="c-switch c-switch-label c-switch-primary">
            <input
              name="sortComune"
              type="checkbox"
              class="c-switch-input"
              v-model="comuneSorting"
            />
            <span
              class="c-switch-slider"
              data-checked="ASC"
              data-unchecked="DES"
            ></span>
          </label>
        </div> -->

        <div class="col-4">
          <CInput placeholder="Indirizzo" v-model="indirizzo" />
        </div>
        <!-- <div class="col-1">
          <label class="c-switch c-switch-label c-switch-primary">
            <input
              name="sortIndirizzo"
              type="checkbox"
              class="c-switch-input"
              v-model="addressSorting"
            />
            <span
              class="c-switch-slider"
              data-checked="ASC"
              data-unchecked="DES"
            ></span>
          </label>
        </div> -->
        <div class="col-2">
          <v-select
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
  name: "SearchFilter",
  mixins: [ValidazioneMixin],
  computed: {
    ...mapGetters("elencoComuni", ["comuni"]),
    ...mapGetters("address", [
      "filterComune",
      "filterAddress",
      "filterValidazione"
    ]),
    comune: {
      get: function() {
        return this.filterComune;
      },
      set: function(selectedComune) {
        this.$store.dispatch("address/setFilterComune", selectedComune);
      }
    },
    indirizzo: {
      get: function() {
        return this.filterAddress;
      },
      set: function(selectedAddress) {
        this.$store.dispatch("address/setFilterAddress", selectedAddress);
      }
    },
    validazione: {
      get: function() {
        return this.filterValidazione;
      },
      set: function(selectedValidazione) {
        this.$store.dispatch(
          "address/setFilterValidazione",
          selectedValidazione
        );
      }
    }
    /*  comuneSorting: {
      get: function() {
        return this.sortComune;
      },
      set: function(comuneSort) {
        this.$store.dispatch("address/setSortComune", comuneSort);
      }
    },
    addressSorting: {
      get: function() {
        return this.sortAddress;
      },
      set: function(addressSort) {
        this.$store.dispatch("address/setSortAddress", addressSort);
      }
    } */
  }
};
</script>

<style scoped>
.filter-head {
  font-weight: 600;
}
</style>
