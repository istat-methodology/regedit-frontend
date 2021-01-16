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
            <template #name="{item}">
              <td>
                <CBadge color="primary">
                  {{ item.name }}
                </CBadge>
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
  name: "DailyReport",
  data() {
    return {
      fields: [
        {
          key: "email",
          label: "Identificativo",
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
          key: "name",
          label: "Nome",
          _style: "width:25%;"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("user", ["users"]),
    usersReport() {
      return this.users.map((user, id) => {
        return {
          ...user,
          id,
          daLavorare: 435,
          lavorati: 184,
          sospesi: 5
        };
      });
    }
  },
  methods: {
    changeUser(value) {
      this.$store.dispatch("dailyReport/findByUser", value.id);
    }
  },
  created() {
    this.$store.dispatch("user/findAll");
  }
};
</script>
