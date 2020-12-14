<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
      <app-progress />
      <div class="card" v-if="addresses">
        <CCardBody>
          <CDataTable
            :items="addressesView"
            :fields="fields"
            column-filter
            :items-per-page="10"
            sorter
            hover
            pagination
          >
            <template #validatoView="{item}">
              <td>
                <CButton
                  shape="square"
                  variant="outline"
                  size="sm"
                  :color="item.validatoColor"
                  @click="handleEdit(item.progressivoIndirizzo)"
                  >{{ item.validatoView }}</CButton
                >
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context, getValidatoColor, getValidatoString } from "@/common";
import Progress from "@/components/Progress";

export default {
  name: "addresslist",
  components: {
    "app-progress": Progress
  },
  data() {
    return {
      fields: [
        {
          key: "progressivoIndirizzo",
          label: "Progressivo"
        },
        {
          key: "codiceArchivio",
          label: "codice Archivio"
        },
        { key: "proCom", label: "PROCOM" },
        { key: "denominazioneComune", label: "Comune" },
        { key: "localitaOriginale", label: "Località" },
        {
          key: "stato",
          label: "Stato di lavorazione"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"]),
    addressesView() {
      return this.addresses.map(addr => {
        return {
          ...addr,
          validatoView: getValidatoString(addr.stato),
          validatoColor: getValidatoColor(addr.validazione)
        };
      });
    }
  },
  methods: {
    getValidatoString,
    getValidatoColor,
    handleEdit(id) {
      this.$router.push({ name: "AddressEdit", params: { id } });
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Address);
    this.$store.dispatch("address/findAll");
  }
};
</script>
