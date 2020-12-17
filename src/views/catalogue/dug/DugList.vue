<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Dug List
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'DugAdd' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="dugs"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            sorter
            hover
            pagination
          >
            <template #show_update="{item}">
              <td>
                <router-link
                  tag="a"
                  :to="{ name: 'DugEdit', params: { id: item.id } }"
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
        <CButton shape="square" size="sm" color="primary" @click="deleteDug">
          Delete
        </CButton>
      </template>
      Delete Dug '{{ selectedDug.value }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "duglist",
  data() {
    return {
      selectedDug: {},
      warningModal: false,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
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
    ...mapGetters("dug", ["dugs"])
  },
  methods: {
    deleteDug() {
      this.$store.dispatch("dug/delete", this.selectedDug.id);
      this.warningModal = false;
    },
    modalOpen(dug) {
      this.selectedDug = dug;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("dug/findAll");
  }
};
</script>
