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
            :items="addresses"
            :fields="fields"
            column-filter
            :items-per-page="10"
            sorter
            hover
            pagination
          >
            <template #stato="{item}">
              <td>
                <CButton
                  shape="square"
                  variant="outline"
                  size="sm"
                  :color="getStatoColor(item.stato)"
                  @click="handleEdit(item.progressivoIndirizzo)"
                  >{{ getStatoString(item.stato) }}</CButton
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
import { Context, getStatoColor, getStatoString } from "@/common";
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
          key: "indirizzoOriginale",
          label: "Indirizzo",
          _style: "min-width:25%;"
        },
        { key: "proCom", label: "PROCOM" },
        { key: "denominazioneComune", label: "Comune" },
        {
          key: "stato",
          label: "Stato di lavorazione"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("address", ["addresses"])
  },
  methods: {
    getStatoString,
    getStatoColor,
    handleEdit(id) {
      this.$router.push({ name: "AddressEdit", params: { id } });
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Address);
    this.$store.dispatch(
      "address/findByUserAndState",
      this.$route.params.state
    );
  }
};
</script>
