<template>
  <div class="c-subheader-nav mfe-2">
    <!-- <header-switch @toggleSwitch="onSwitch"></header-switch> -->
    <div
      class="c-subheader-nav mfe-2"
      v-if="this.$route.params.state == 2 && isSupervisor"
    >
      <!-- <vue-blob-json-csv
        file-type="csv"
        file-name="ElencoToponimi"
        tag-name="i"
        :data="json_data"
        title="Download CSV"
        confirm="Desideri confermare il download?"
      >
      </vue-blob-json-csv> -->

      <button @click="downloadFile()" class="np-btn">Download CSV</button>
    </div>

    <div class="c-subheader-nav mfe-2">
      <!-- <download-csv :data="json_data">
        Download Data
        <img src="download_icon.png" />
      </download-csv> -->
      <!-- <vue-blob-json-csv
        @success="handleSuccess"
        @error="handleError"
        tag-name="div"
        file-type="json"
        file-name="sample"
        title="Download JSON"
        :data="json_data"
        
      ></vue-blob-json-csv> -->
      <CButton
        v-if="isToponimi === true || isToponimi === 'true'"
        shape="square"
        variant="outline"
        size="sm"
        color="primary"
        @click="Switch"
        >Indirizzi..</CButton
      >
      <CButton
        v-else
        shape="square"
        variant="outline"
        size="sm"
        color="success"
        @click="Switch"
        >Toponimi..</CButton
      >
    </div>
    <template v-if="isSupervisor">
      <span class="revisore">Revisore:</span>
      <span v-if="isToponimi" class="revisore-name pl-1 pr-2">
        {{ assignedTopName | dashEmpty }}</span
      >
      <span v-else class="revisore-name pl-1 pr-2">
        {{ assignedName | dashEmpty }}</span
      >
    </template>
    <template v-else>
      <a href=" https://www.google.it/maps" target="_blank" class="pr-3"
        >Google maps</a
      >
      <a
        href=" http://maldive:8080/egonweb/main.action"
        target="_blank"
        class="pr-2"
        >Egon</a
      >
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import toponimoMixin from "@/components/mixins/toponimo.mixin";
import exportFromJSON from "export-from-json";
//import VueCsvDownloader from "vue-csv-downloader";
//import Vue from "vue";
/* import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV); */
//import VueBlobJsonCsv from "vue-blob-json-csv";
//Vue.use(VueBlobJsonCsv);
//import HeaderSwitch from "@/components/HeaderSwitch";
export default {
  name: "HeaderNav",
  mixins: [toponimoMixin],
  data: function() {
    return {
      nomeFile: "Toponimi",
      switch1: true,
      color: "primary",
      shape: "square",
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters("coreui", ["isHome"]),
    ...mapGetters("auth", ["isSupervisor", "isReviewer"]),
    ...mapGetters("address", ["assignedId", "assignedName"]),
    ...mapGetters("toponimo", ["assignedTopId", "assignedTopName"]),
    ...mapGetters("customswitch", ["isToponimi"]),
    ...mapGetters("csv", ["exportCSV"])
  },
  methods: {
    async downloadFile() {
      const anno = new Date().getFullYear();
      const mese =
        new Date().getMonth().toString().length > 1
          ? new Date().getMonth().valueOf() + 1
          : "0" + (new Date().getMonth().valueOf() + 1);
      const giorno = new Date().getDate();
      const nome_File = this.nomeFile + anno + mese + giorno;
      const fileName = nome_File;
      const exportType = exportFromJSON.types.csv;
      const delimiter = ";";
      await this.$store.dispatch("csv/exportCSV");
      const data = this.exportCSV;
      if (data) exportFromJSON({ data, fileName, exportType, delimiter });
    },
    Switch() {
      //console.log(checkval);
      if (this.$route.path != "/") {
        this.$router.push("/").catch(() => {});
      }
      return this.$store.dispatch("customswitch/setToponimi", !this.isToponimi);
    }
  }
};
</script>

<style scoped>
.revisore {
  color: #3c4b64;
}
.revisore-name {
  color: #321fdb;
}
</style>
