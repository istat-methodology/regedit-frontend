<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <CCard>
        <CCardHeader>
          Step instance
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Method"
            placeholder="Method"
            :class="{ 'is-invalid': $v.stepInstance.method.$error }"
            v-model="stepInstance.method"
          />
          <div
            class="help-block"
            :class="{ show: $v.stepInstance.method.$error }"
          >
            This field is required
          </div>
          <CInput
            label="Label"
            placeholder="Label"
            :class="{ 'is-invalid': $v.stepInstance.label.$error }"
            v-model="stepInstance.label"
          />
          <div
            class="help-block"
            :class="{ show: $v.stepInstance.label.$error }"
          >
            This field is required
          </div>
          <CTextarea
            rows="3"
            label="Description"
            placeholder="Description"
            :class="{ 'is-invalid': $v.stepInstance.descr.$error }"
            v-model="stepInstance.descr"
          />
          <div
            class="help-block"
            :class="{ show: $v.stepInstance.descr.$error }"
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
            >Update</CButton
          >
          <CButton shape="square" size="sm" color="light" @click="goBack"
            >Back</CButton
          >
        </CCardFooter>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "stepInstanceEdit",
  computed: {
    ...mapGetters("stepInstance", ["stepInstance"])
  },
  validations: {
    stepInstance: {
      method: {
        required
      },
      label: {
        required
      },
      descr: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.stepInstance.$invalid) {
        this.$store
          .dispatch("stepInstance/update", this.stepInstance)
          .then(() => {
            this.goBack();
          });
      }
    },
    goBack() {
      this.$router.push("/components/stepInstance");
    }
  },
  created() {
    this.$store.dispatch("stepInstance/findById", this.$route.params.id);
  }
};
</script>
