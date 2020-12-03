<template>
  <div class="row">
    <div class="col-4">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Da lavorare</span
              ><span class="ml-auto font-weight-bold">130</span>
            </div>
          </div>
          <CProgress :value="daLavorare" color="primary" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-4">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Validato</span
              ><span class="ml-auto font-weight-bold">60</span>
            </div>
          </div>
          <CProgress :value="validato" color="success" size="sm" />
        </CCardBody>
      </CCard>
    </div>
    <div class="col-4">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Revisionato</span
              ><span class="ml-auto font-weight-bold">10</span>
            </div>
          </div>
          <CProgress :value="revisionato" color="danger" size="sm" />
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { CProgress } from "@coreui/vue";
export default {
  name: "Progress",
  components: {
    CProgress
  },
  data() {
    return {
      daLavorare: 65,
      validato: 30,
      revisionato: 5
    };
  }
};
</script>

<style scoped>
.color-primary {
  color: #321fdb;
}
.color-success {
  color: #2eb85c;
}
.color-danger {
  color: #e55353;
}
.card-body-progress {
  padding: 0.75rem 1.25rem;
}
.progress-group {
  margin-bottom: 0.3rem;
}
.material-design-icon > .material-design-icon__svg {
  bottom: 0em;
}
</style>
