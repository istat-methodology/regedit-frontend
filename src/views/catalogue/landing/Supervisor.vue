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
import { Role } from "@/common";
import pivotMixin from "@/components/mixins/pivot.mixin";

export default {
  name: "Supervisor",
  mixins: [pivotMixin],
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
          _style: "width:10%;"
        },
        {
          key: "daLavorare",
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
    ...mapGetters("user", ["users"]),
    ...mapGetters("pivot", ["reports"]),
    ...mapGetters("address", ["assignedId"]),
    usersReport() {
      return this.users.map((user, index) => {
        return {
          ...user,
          index,
          assigned: this.isAssigned(user),
          ...this.getPivot(this.reports, user)
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
      this.$store
        .dispatch("address/setAssigned", {
          id: user.id,
          name: user.email
        })
        .then(() => {
          this.$store.dispatch("progress/findByUser");
        });
    },
    getReport(user) {
      return this.reports.find(report => {
        return report.user == user.id;
      });
    },
    getDalavorare(user) {
      const report = this.getReport(user);
      return report === undefined ? "-" : report.dalavorare;
    },
    getLavorati(user) {
      const report = this.getReport(user);
      return report === undefined ? "-" : report.revisionati + report.validati;
    },
    getSospesi(user) {
      const report = this.getReport(user);
      return report === undefined ? "-" : report.sospesi;
    },
    getColor(user) {
      return user.assigned ? "success" : "primary";
    }
  },
  created() {
    this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("pivot/findAll").then(() => {
      this.$store.dispatch("user/findByRole", Role.Reviewer);
    });
  }
};
</script>
