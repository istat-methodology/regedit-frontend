<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Registro dei luoghi
        </header>
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
            <template #validato="{item}">
              <td>
                <CBadge :color="getColor(item)">
                  <span> {{ getContent(item) }}</span>
                </CBadge>
              </td>
            </template>
            <template #show_update="{item}">
              <td>
                <router-link
                  tag="a"
                  :to="{
                    name: 'AddressEdit',
                    params: { id: item.id }
                  }"
                >
                  <edit-icon />
                </router-link>
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

export default {
  name: "addresslist",
  data() {
    return {
      selectedAddress: {},
      warningModal: false,
      fields: [
        {
          key: "progressivo_indirizzo_or",
          label: "Progressivo",
          _style: "width:10%"
        },
        {
          key: "indirizzo_originale",
          label: "Indirizzo registro",
          _style: "width:15%"
        },
        { key: "comune_or", label: "Comune", _style: "width:15%;" },
        { key: "localita_or", label: "Localita", _style: "width:10%;" },
        {
          key: "validato",
          label: "Validato",
          _style: "width:5%;",
          filter: false
        },
        {
          key: "show_update",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("addressServ", ["addresses"])
  },
  methods: {
    getColor(address) {
      switch (address.validato) {
        case true:
          return "success";
        case false:
          return "danger";
        default:
          "primary";
      }
    },
    getContent(address) {
      switch (address.validato) {
        case true:
          return "VALIDATO";
        case false:
          return "REVISIONATO";
        default:
          "DA VALIDARE";
      }
    }
  },
  created() {
    this.$store.dispatch("addressServ/findAll");
  }
};
</script>
