<template>
  <div class="card fade-in">
    <CCardHeader
      ><span class="filter-head">Filtri di ricerca</span></CCardHeader
    >
    <CCardBody>
      <div class="row">
        <div class="col-3">
          <v-select
            v-if="comuni"
            label="denominazioneComune"
            :options="comuni"
            placeholder="Tutti i comuni"
            v-model="comune"
          ></v-select>
        </div>
        <div class="col-1">
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
        </div>

        <div class="col-3">
          <CInput placeholder="Indirizzo" v-model="indirizzo" />
        </div>
        <div class="col-1">
          <label class="c-switch c-switch-label c-switch-primary">
            <input type="checkbox" class="c-switch-input" checked />
            <span
              class="c-switch-slider"
              data-checked="ASC"
              data-unchecked="DES"
            ></span>
          </label>
        </div>
        <div class="col-3">
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

export default {
  name: "SearchFilter",
  computed: {
    ...mapGetters("elencoComuni", ["comuni"]),
    ...mapGetters("address", ["filterComune", "sortComune", "filterAddress"]),
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
    comuneSorting: {
      get: function() {
        return this.sortComune;
      },
      set: function(comuneSort) {
        this.$store.dispatch("address/setSortComune", comuneSort);
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
