<template>
  <div class="row">
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Da lavorare</span
              ><span class="ml-auto font-weight-bold"
                >{{ daLavorare }} / {{ total }}</span
              >
            </div>
          </div>
          <CProgress :value="daLavorareRatio" color="primary" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Validati</span
              ><span class="ml-auto font-weight-bold"
                >{{ validati }} / {{ total }}</span
              >
            </div>
          </div>
          <CProgress :value="validatiRatio" color="success" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Revisionati</span
              ><span class="ml-auto font-weight-bold"
                >{{ revisionati }} / {{ total }}</span
              >
            </div>
          </div>
          <CProgress :value="revisionatiRatio" color="danger" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Sospesi</span
              ><span class="ml-auto font-weight-bold"
                >{{ sospesi }} / {{ total }}</span
              >
            </div>
          </div>
          <CProgress :value="sospesiRatio" color="warning" size="sm" />
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
    ...mapGetters("progressTop", ["reportsTop"]),

    total() {
      return this.getTotal(this.reportsTop);
    },
    daLavorare() {
      return this.getDaLavorare(this.reportsTop);
    },
    validati() {
      return this.getValidati(this.reportsTop);
    },
    revisionati() {
      return this.getRevisionati(this.reportsTop);
    },
    sospesi() {
      return this.getSospesi(this.reportsTop);
    },
    daLavorareRatio() {
      return Math.round((this.daLavorare / this.total) * 100);
    },
    validatiRatio() {
      return Math.round((this.validati / this.total) * 100);
    },
    revisionatiRatio() {
      return Math.round((this.revisionati / this.total) * 100);
    },
    sospesiRatio() {
      return Math.round((this.sospesi / this.total) * 100);
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
