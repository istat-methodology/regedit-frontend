<template>
  <CCard class="card-no-border">
    <CCardBody>
      <CInput
        label="Name*"
        placeholder="Name"
        :class="{ 'is-invalid': $v.process.name.$error }"
        v-model="process.name"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.process.name.$error }">
        This field is required
      </div>
      <CInput
        label="Label*"
        placeholder="Label"
        :class="{ 'is-invalid': $v.process.label.$error }"
        v-model="process.label"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.process.label.$error }">
        This field is required
      </div>
      <CTextarea
        rows="3"
        label="Description*"
        placeholder="Description"
        :class="{ 'is-invalid': $v.process.description.$error }"
        v-model="process.description"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.process.description.$error }">
        This field is required
      </div>
      <CInput
        label="Organization*"
        placeholder="Organization"
        :class="{ 'is-invalid': $v.process.organization.$error }"
        v-model="process.organization"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.process.organization.$error }">
        This field is required
      </div>
      <div class="form-mandatory">*Mandatory fields</div>
    </CCardBody>
    <CCardFooter>
      <CButton
        shape="square"
        size="sm"
        color="primary"
        style="margin-right:0.3rem"
        @click.prevent="handleSubmit"
        >Next</CButton
      >
    </CCardFooter>
  </CCard>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProcessDomain",
  props: {
    process: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      fieldChanged: false //do nothing if nothing changes
    };
  },
  validations: {
    process: {
      name: {
        required
      },
      description: {
        required
      },
      label: {
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
      if (!this.$v.$invalid) {
        this.$emit("update", this.process, this.fieldChanged);
        this.fieldChanged = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
