<template>
  <div class="row">
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi da lavorare</span>
          <span class="badge float-right badge-primary"
            >{{ daLavorare }} / {{ total }}</span
          >
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi da lavorare.
          <p class="section-link">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 1 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
          <!-- <p class="section-link" v-if="daLavorare > 0">
            <router-link
              tag="a"
              :to="{ name: 'AddressEdit', params: { state: 1 } }"
              ><span>Inizia subito a lavorare <chevron-right-icon /></span>
            </router-link>
          </p> -->
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi lavorati</span>
          <span class="badge float-right badge-success"
            >{{ lavorati }} / {{ total }}</span
          >
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi lavorati.
          <p class="section-link">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 2 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <header class="card-header">
          <span>Indirizzi sospesi</span>
          <span class="badge float-right badge-warning"
            >{{ sospesi }} / {{ total }}</span
          >
        </header>
        <div class="card-body">
          In questa sezione puoi trovare la lista degli indirizzi sospesi.
          <p class="section-link">
            <router-link
              tag="a"
              :to="{ name: 'AddressList', params: { state: 3 } }"
              ><span>Vai alla lista <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import progressMixin from "@/components/mixins/progress.mixin";

export default {
  name: "ReviewerTop",
  mixins: [progressMixin],
  computed: {
    ...mapGetters("progressTop", ["reportsTop"]),
    total() {
      return this.getTotal(this.reportsTop);
    },
    daLavorare() {
      return this.getDaLavorare(this.reportsTop);
    },
    lavorati() {
      return (
        this.getValidati(this.reportsTop) + this.getRevisionati(this.reportsTop)
      );
    },
    sospesi() {
      return this.getSospesi(this.reportsTop);
    }
  },
  created() {
    //this.$store.dispatch("progress/findByUser");
    this.$store.dispatch("progressTop/findByUser");
    //clear cache
    this.$store.dispatch("toponimo/clearTop");
  }
};
</script>

<style scoped>
.material-design-icon > .material-design-icon__svg {
  bottom: -0.17rem;
}
</style>
