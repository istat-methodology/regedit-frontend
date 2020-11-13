<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          App Roles
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'AppRoleNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="approles"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
            <template #show_update="{item}">
              <td>
                <router-link
                  tag="a"
                  :to="{ name: 'AppRoleEdit', params: { id: item.id } }"
                >
                  <edit-icon />
                </router-link>
              </td>
            </template>
            <template #show_delete="{item}">
              <td>
                <span class="icon-link" @click="modalOpen(item)"
                  ><delete-icon
                /></span>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
    <CModal title="Warning!" :show.sync="warningModal">
      <template #footer>
        <CButton shape="square" size="sm" color="light" @click="modalClose">
          Close
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="appRoleDelete"
        >
          Delete
        </CButton>
      </template>
      Delete role '{{ selectedAppRole.name }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "appRoleList",
  data() {
    return {
      selectedAppRole: {},
      warningModal: false,
      fields: [
        { key: "code", _style: "width:10%" },
        { key: "name", _style: "width:10%;" },
        { key: "descr", _style: "width:25%;" },
        { key: "order_code", label: "Order", _style: "width:10%;" },
        { key: "cls_data_type_id", label: "Type", _style: "width:5%;" },
        { key: "parameter_id", label: "Param", _style: "width:5%;" },
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
    ...mapGetters("approle", ["approles"])
  },
  methods: {
    appRoleDelete() {
      this.$store.dispatch("approle/delete", this.selectedAppRole.id);
      this.warningModal = false;
    },
    modalOpen(appRole) {
      this.selectedAppRole = appRole;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("approle/findAll");
  }
};
</script>
