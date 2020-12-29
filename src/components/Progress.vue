<template>
  <div class="row">
    <div class="col-3">
      <CCard>
        <CCardBody class="card-body-progress">
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Da revisionare</span
              ><span class="ml-auto font-weight-bold">130/200</span>
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
              ><span class="ml-auto font-weight-bold">60/200</span>
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
              ><span class="ml-auto font-weight-bold">10/200</span>
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
              ><span class="ml-auto font-weight-bold">100/200</span>
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
export default {
  name: "Progress",
  components: {
    CProgress
  },
  data() {
    return {
      daLavorare: 65,
      validato: 30,
      revisionato: 5,
      sospeso: 50
    };
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
