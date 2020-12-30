<template>
  <div class="row">
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Da revisionare</span
              ><span class="ml-auto font-weight-bold"
                >{{ daLavorareItems }} / {{ totalItems }}</span
              >
            </div>
          </div>
          <CProgress :value="daLavorare" color="primary" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Validato</span
              ><span class="ml-auto font-weight-bold"
                >{{ validatiItems }} / {{ totalItems }}</span
              >
            </div>
          </div>
          <CProgress :value="validato" color="success" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Revisionato</span
              ><span class="ml-auto font-weight-bold"
                >{{ revisionatiItems }} / {{ totalItems }}</span
              >
            </div>
          </div>
          <CProgress :value="revisionato" color="danger" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Sospeso</span
              ><span class="ml-auto font-weight-bold"
                >{{ sospesiItems }} / {{ totalItems }}</span
              >
            </div>
          </div>
          <CProgress :value="sospeso" color="warning" size="sm" />
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { CProgress } from "@coreui/vue";
import { mapGetters } from "vuex";
import progressMixin from "@/components/mixins/progress.mixin";
export default {
  name: "ProgressBar",
  mixins: [progressMixin],
  components: {
    CProgress
  },
  computed: {
    ...mapGetters("progress", ["reports"]),

    totalItems() {
      return this.getTotal(this.reports);
    },
    daLavorareItems() {
      return this.getDaLavorare(this.reports);
    },
    validatiItems() {
      return this.getValidati(this.reports);
    },
    revisionatiItems() {
      return this.getRevisionati(this.reports);
    },
    sospesiItems() {
      return this.getSospesi(this.reports);
    },
    daLavorare() {
      return Math.round((this.daLavorareItems / this.totalItems) * 100);
    },
    validato() {
      return Math.round((this.validatiItems / this.totalItems) * 100);
    },
    revisionato() {
      return Math.round((this.revisionatiItems / this.totalItems) * 100);
    },
    sospeso() {
      return Math.round((this.sospesiItems / this.totalItems) * 100);
    }
  }
};
</script>

<style scoped>
.card-body-progress {
  padding: 0.75rem 1.25rem;
}
.progress-group {
  margin-bottom: 0.3rem;
}
.material-design-icon > .material-design-icon__svg {
  color: #3c4b64;
  height: 1rem;
  width: 1rem;
}
</style>
