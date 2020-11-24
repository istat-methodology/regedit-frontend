<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Registro dei luoghi
        </header>
        <CCardBody>
          <CDataTable
            :items="addressServices"
            :fields="fields"
            column-filter
            :items-per-page="10"
            sorter
            pagination
          >
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
            <template #show_delete="{item}">
              <td>
                <a href="#" @click="modalOpen(item)"><delete-icon /></a>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
    <CModal title="Warning!" :show.sync="warningModal">
      <template #footer>
        <CButton shape="square" size="sm" color="light" @click="modalClose()">
          Close
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="deleteAddress()"
        >
          Delete
        </CButton>
      </template>
      Delete address '{{ selectedAddress.id }}'?
    </CModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { Context } from "@/common";

export default {
  name: "addresslist",
  data() {
    return {
      selectedAddress: {},
      warningModal: false,
      fields: [
        {
          key: "indirizzo_originale",
          label: "Indirizzo registro",
          _style: "width:15%"
        },
        { key: "comune_or", label: "Comune", _style: "width:15%;" },
        { key: "localita_or", label: "Localita", _style: "width:10%;" },
        {
          key: "show_update",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_delete",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("addressServ", ["addressServices"])
  },
  methods: {
    deleteAddress() {
      this.$store.dispatch("addressServ/delete", this.selectedAddress.id);
      this.warningModal = false;
    },
    modalOpen(address) {
      this.selectedAddress = address;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    // this.$store.dispatch("coreui/setContext", Context.Service);
    this.$store.dispatch("addressServ/findAll");
  }
};
</script>
