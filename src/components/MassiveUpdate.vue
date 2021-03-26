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
        <div class="col-5">
          <CInput placeholder="Località" v-model="loc" />
        </div>
        <div class="col-5">
          <CInput placeholder="Codice Strada" v-model="codStrada" />
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
            @click="
              $emit(
                'update-selected',
                dugVal,
                dufVal,
                noteVal,
                localita,
                codiceStrada
              )
            "
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
  data: function() {
    return {
      dugVal: null,
      dufVal: null,
      noteVal: null,
      localita: null,
      codiceStrada: null
    };
  },
  computed: {
    ...mapGetters("dug", ["dugs"]),
    dug: {
      get: function() {
        return this.dugVal;
      },
      set: function(dugVal) {
        this.dugVal = dugVal;
      }
    },
    duf: {
      get: function() {
        return this.dufVal;
      },
      set: function(dufVal) {
        this.dufVal = dufVal;
      }
    },
    loc: {
      get: function() {
        return this.localita;
      },
      set: function(localita) {
        this.localita = localita;
      }
    },
    codStrada: {
      get: function() {
        return this.codiceStrada;
      },
      set: function(codStrada) {
        this.codiceStrada = codStrada;
      }
    },
    note: {
      get: function() {
        return this.noteVal;
      },
      set: function(noteVal) {
        this.noteVal = noteVal;
      }
    },

    dugNames() {
      return this.dugs.map(dug => {
        return dug.name;
      });
    },
    setDug(dug) {
      return dug;
    }
  }
};
</script>

<style scoped>
.filter-head {
  font-weight: 600;
}
</style>
