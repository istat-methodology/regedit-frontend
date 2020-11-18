<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Services
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'AddressServiceAdd' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="addressServices"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            sorter
            pagination
          >
            <template #show_update="{item}">
              <td>
                <router-link
                  tag="a"
                  :to="{
                    name: 'AddressServiceEdit',
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
          @click="deleteService()"
        >
          Delete
        </CButton>
      </template>
      Delete service '{{ selectedAddress.name }}'?
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
        { key: "codice_archivio_or", _style: "width:5%" },
        { key: "progressivo_indirizzo_or", _style: "width:15%" },
        { key: "comune_or", _style: "width:15%;" },
        { key: "localita_or", _style: "width:10%;" },
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
    deleteService() {
      this.$store.dispatch("addressService/delete", this.selectedAddress.id);
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
