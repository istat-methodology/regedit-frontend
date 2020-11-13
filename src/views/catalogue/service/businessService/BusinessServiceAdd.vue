<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          Business Service
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Name"
            placeholder="Name"
            :class="{ 'is-invalid': $v.service.name.$error }"
            v-model="service.name"
          />
          <div class="help-block" :class="{ show: $v.service.name.$error }">
            This field is required
          </div>
          <CTextarea
            rows="3"
            label="Description"
            placeholder="Description"
            :class="{ 'is-invalid': $v.service.description.$error }"
            v-model="service.description"
          />
          <div
            class="help-block"
            :class="{ show: $v.service.description.$error }"
          >
            This field is required
          </div>
          <CInput
            label="Organization"
            placeholder="Organization"
            :class="{
              'is-invalid': $v.service.organization.$error
            }"
            v-model="service.organization"
          />
          <div
            class="help-block"
            :class="{ show: $v.service.organization.$error }"
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
          <CButton shape="square" size="sm" color="light" @click="goBack"
            >Back</CButton
          >
        </CCardFooter>
      </CCard>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ServiceAdd",
  data() {
    return {
      service: {
        name: "",
        description: "",
        organization: ""
      },
      errors: []
    };
  },
  validations: {
    service: {
      name: {
        required
      },
      description: {
        required
      },
      organization: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.service.$invalid) {
        this.$store
          .dispatch("businessService/save", this.service)
          .then(this.$router.push("/catalogue/service"));
      }
    },
    goBack() {
      this.$router.push("/catalogue/service");
    }
  }
};
</script>
