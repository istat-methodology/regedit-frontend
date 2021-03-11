<template>
  <div class="card fade-in">
    <CCardHeader
      ><span class="massive-head">Inserimento multiplo</span></CCardHeader
    >
    <CCardBody>
      <div class="row">
        <div class="col-5">
          <v-select
            v-if="dugs"
            v-model="dug"
            :options="dugNames"
            placeholder="Dug"
          ></v-select>
        </div>
        <div class="col-5">
          <CInput placeholder="Duf" v-model="duf" />
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <CTextarea placeholder="Note" rows="1" v-model="note" />
        </div>
        <div class="col-2">
          <CButton
            shape="square"
            size="sm"
            color="primary"
            class="mt-1"
            @click="$emit('update-selected', $event, dug, duf, note)"
            >Inserisci</CButton
          >
        </div>
      </div>
    </CCardBody>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MassiveUpdate",
  props: {
    dug: String,
    duf: String,
    note: String
  },
  computed: {
    ...mapGetters("dug", ["dugs"]),
    data: function() {
      return {
        dug: String,
        duf: String,
        note: String
      };
    },
    dugNames() {
      return this.dugs.map(dug => {
        return dug.name;
      });
    }
    /* ...mapGetters("elencoComuni", ["comuni"]),
    ...mapGetters("address", [
      "filterComune",
      "filterAddress",
      "filterValidazione"
    ]), */
  }
};
</script>

<style scoped>
.filter-head {
  font-weight: 600;
}
</style>
