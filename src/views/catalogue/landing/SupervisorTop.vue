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
  name: "SupervisorTop",
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
          key: "userSurname",
          label: "Cognome",
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
    ...mapGetters("pivotTop", ["reportsTop"]),
    ...mapGetters("toponimo", ["assignedTopId"]),
    usersReport() {
      return this.reportsTop
        ? this.reportsTop.map((userReportTop, index) => {
            return {
              ...userReportTop,
              index,
              assigned: this.isAssigned(userReportTop)
            };
          })
        : [];
    }
  },
  methods: {
    isAssigned(userReportTop) {
      return this.assignedTopId > 0
        ? userReportTop.userId === parseInt(this.assignedTopId)
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
        .dispatch("toponimo/setAssigned", {
          id: userReport.userId,
          name: userReport.userEmail
        })
        .then(() => {
          //this.$store.dispatch("progress/findByUser");
          this.$store.dispatch("progressTop/findByUser");
        });
    },
    getColor(user) {
      return user.assigned ? "success" : "primary";
    }
  },
  created() {
    //this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("progressTop/findByUser");
    this.$store.dispatch("pivotTop/findAll");
  }
};
</script>
