<template>
  <div class="row">
    <div class="col-12">
      <div class="card fade-in">
        <CCardBody>
          <CDataTable
            :items="usersReport"
            :fields="fields"
            column-filter
            :items-per-page="10"
            sorter
            hover
            pagination
          >
            <template #assign="{item}">
              <td class="py-2">
                <CButton
                  :color="getColor(item)"
                  variant="outline"
                  square
                  size="sm"
                  @click="assign(item)"
                >
                  {{ Boolean(item.assigned) ? "Selezionato" : "Seleziona" }}
                </CButton>
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
import { Role } from "@/common";

export default {
  name: "Supervisor",
  data() {
    return {
      fields: [
        {
          key: "email",
          label: "Identificativo",
          _style: "width:10%;"
        },
        {
          key: "name",
          label: "Nome",
          _style: "width:25%;"
        },
        {
          key: "role",
          label: "Ruolo",
          _style: "width:10%;"
        },
        {
          key: "daLavorare",
          label: "Da lavorare",
          _style: "width:10%;"
        },
        {
          key: "lavorati",
          label: "Lavorati",
          _style: "width:10%;"
        },
        {
          key: "sospesi",
          label: "Sospesi",
          _style: "width:10%;"
        },
        {
          key: "assign",
          label: "Seleziona",
          _style: "width:5%;",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("user", ["users"]),
    ...mapGetters("address", ["assignedId"]),
    usersReport() {
      return this.users.map((user, index) => {
        return {
          ...user,
          index,
          assigned: this.isAssigned(user),
          daLavorare: 435,
          lavorati: 184,
          sospesi: 5
        };
      });
    }
  },
  methods: {
    isAssigned(user) {
      return this.assignedId > 0
        ? user.id === parseInt(this.assignedId)
        : false;
    },
    clearAssigned() {
      this.usersReport.map(user => {
        return {
          ...user,
          assigned: false
        };
      });
    },
    assign(user) {
      this.clearAssigned();
      this.usersReport.splice(user.index, 1, { ...user, assigned: true });
      this.$store.dispatch("address/setAssigned", {
        id: user.id,
        name: user.email
      });
      this.$store.dispatch("progress/findByUser");
    },
    getColor(user) {
      return user.assigned ? "success" : "primary";
    }
  },
  created() {
    this.$store.dispatch("user/findByRole", Role.Reviewer);
    this.$store.dispatch("pivot/findAll");
  }
};
</script>
