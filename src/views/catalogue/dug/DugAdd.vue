<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          New Dug
        </CCardHeader>
        <CCardBody>
          <div class="row">
            <div class="col-6">
              <CCard class="card-no-border">
                <CCardBody>
                  <CInput
                    label="Dug"
                    placeholder="Dug"
                    :class="{ 'is-invalid': $v.dugitem.dug.$error }"
                    v-model="dugitem.dug"
                  />
                  <div
                    class="help-block"
                    :class="{ show: $v.dugitem.dug.$error }"
                  >
                    This field is required
                  </div>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    shape="square"
                    size="sm"
                    color="primary"
                    class="mr-2"
                    @click.prevent="handleSubmit"
                    >Next</CButton
                  >
                  <CButton
                    shape="square"
                    size="sm"
                    color="light"
                    @click="goBack"
                    >Back</CButton
                  >
                </CCardFooter>
              </CCard>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "DugAdd",
  data() {
    return {
      dugitem: {
        dug: ""
      }
    };
  },
  validations: {
    dugitem: {
      dug: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.dugitem.$invalid) {
        this.$store
          .dispatch("dugServ/save", this.dugitem)
          .then(this.$router.push("/catalogue/dug"));
      }
    },
    goBack() {
      this.$router.push("/catalogue/dug");
    }
  }
};
</script>
