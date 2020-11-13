<template>
  <div class="row" v-if="businessProcesses">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Processes
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'BusinessProcessAdd' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="businessProcesses"
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
                  :to="{ name: 'BusinessProcessEdit', params: { id: item.id } }"
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
          @click="deleteProcess"
        >
          Delete
        </CButton>
      </template>
      Delete process '{{ selectedProcess.name }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "processlist",
  data() {
    return {
      selectedProcess: {},
      warningModal: false,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
        { key: "description", _style: "width:15%;" },
        { key: "label", _style: "width:20%;" },
        { key: "organization", _style: "width:10%;" },
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
    ...mapGetters("businessProcess", ["businessProcesses"])
  },
  methods: {
    deleteProcess() {
      this.$store.dispatch("businessProcess/delete", this.selectedProcess.id);
      this.warningModal = false;
    },
    modalOpen(process) {
      this.selectedProcess = process;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Process);
    this.$store.dispatch("businessProcess/findAll");
  }
};
</script>
