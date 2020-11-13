<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Process steps
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'ProcessStepNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="processSteps"
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
                  :to="{ name: 'ProcessStepEdit', params: { id: item.id } }"
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
        <CButton shape="square" size="sm" color="primary" @click="stepDelete">
          Delete
        </CButton>
      </template>
      Delete step '{{ selectedStep.name }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "processStepList",
  data() {
    return {
      selectedStep: {},
      warningModal: false,
      fields: [
        { key: "name", _style: "width:10%" },
        { key: "label", _style: "width:10%;" },
        { key: "descr", _style: "width:30%;" },
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
    ...mapGetters("processStep", ["processSteps"])
  },
  methods: {
    stepDelete() {
      this.$store.dispatch("processStep/delete", this.selectedStep.id);
      this.warningModal = false;
    },
    modalOpen(step) {
      this.selectedStep = step;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("processStep/findAll");
  }
};
</script>
