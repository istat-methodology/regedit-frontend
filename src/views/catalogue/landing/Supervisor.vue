<template>
  <div class="row">
    <div class="col-12" v-if="isLoading">
      <tile></tile>
    </div>
    <div class="col-12" v-else>
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

export default {
  name: "Supervisor",
  data() {
    return {
      fields: [
        {
          key: "userEmail",
          label: "Identificativo",
          _style: "width:10%;"
        },
        {
          key: "userName",
          label: "Nome",
          _style: "width:10%;"
        },
        {
          key: "dalavorare",
          label: "Da lavorare",
          _style: "width:10%;"
        },
        {
          key: "validati",
          label: "Validati",
          _style: "width:10%;"
        },
        {
          key: "revisionati",
          label: "Revisionati",
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
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("pivot", ["reports"]),
    ...mapGetters("address", ["assignedId"]),
    usersReport() {
      return this.reports.map((userReport, index) => {
        return {
          ...userReport,
          index,
          assigned: this.isAssigned(userReport)
        };
      });
    }
  },
  methods: {
    isAssigned(userReport) {
      return this.assignedId > 0
        ? userReport.userId === parseInt(this.assignedId)
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
    assign(userReport) {
      this.clearAssigned();
      this.usersReport.splice(userReport.index, 1, {
        ...userReport,
        assigned: true
      });
      this.$store
        .dispatch("address/setAssigned", {
          id: userReport.userId,
          name: userReport.userEmail
        })
        .then(() => {
          this.$store.dispatch("progress/findByUser");
        });
    },
    getColor(user) {
      return user.assigned ? "success" : "primary";
    }
  },
  created() {
    this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("pivot/findAll");
  }
};
</script>
