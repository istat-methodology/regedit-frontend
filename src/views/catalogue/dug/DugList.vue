<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Elenco Dug
        </header>
        <CCardBody>
          <CDataTable
            :items="dugss"
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
                    name: 'DugEdit',
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
          @click="deleteDug()"
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
  name: "duglist",
  data() {
    return {
      selectedDug: {},
      warningModal: false,
      fields: [
        {
          key: "id",
          label: "id",
          _style: "width:15%"
        },
        { key: "dug", label: "dug", _style: "width:55%;" },
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
    ...mapGetters("dugServ", ["dugs"])
  },
  methods: {
    deleteDug() {
      this.$store.dispatch("dugServ/delete", this.selectedDug.id);
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
    // this.$store.dispatch("coreui/setContext", Context.Service);
    this.$store.dispatch("dugServ/findAll");
  }
};
</script>
