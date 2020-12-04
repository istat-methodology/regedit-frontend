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
                  @click="handleEdit(item.id)"
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
          key: "progressivo_indirizzo_or",
          label: "Progressivo"
        },
        {
          key: "indirizzo_originale",
          label: "Indirizzo originale"
        },
        { key: "comune_or", label: "Comune originale" },
        { key: "localita_or", label: "Localita originale" },
        {
          key: "validatoView",
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
          validatoView: getValidatoString(addr.validato),
          validatoColor: getValidatoColor(addr.validato)
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
