<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">500</h1>
          <h4 class="pt-3">Houston, we have a problem!</h4>
          <p class="text-muted">
            An error occurred, please contact the administrator
          </p>
        </div>
        <div class="clearfix mb-3">
          <h4 class="pt-3">Error message:</h4>
          <p class="text-muted">{{ msg }}</p>
        </div>
        <div class="clearfix mb-3">
          <router-link tag="a" to="/login">
            <CIcon name="cilHome"></CIcon>
            <span>&nbsp;Go to home page</span>
          </router-link>
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { CRow, CCol } from "@coreui/vue";
import { mapGetters } from "vuex";

export default {
  name: "Error",
  components: {
    CRow,
    CCol
  },
  computed: {
    ...mapGetters("error", ["msg"])
  }
};
</script>
