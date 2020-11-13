<template>
  <div class="row" v-if="step">
    <div class="col-sm-12 col-md-6">
      <CCard>
        <CCardHeader>
          Process step
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Name"
            placeholder="Name"
            :class="{ 'is-invalid': $v.step.name.$error }"
            v-model="step.name"
          />
          <div class="help-block" :class="{ show: $v.step.name.$error }">
            This field is required
          </div>
          <CInput
            label="Label"
            placeholder="Label"
            :class="{ 'is-invalid': $v.step.label.$error }"
            v-model="step.label"
          />
          <div class="help-block" :class="{ show: $v.step.label.$error }">
            This field is required
          </div>
          <CTextarea
            rows="3"
            label="Description"
            placeholder="Description"
            :class="{ 'is-invalid': $v.step.descr.$error }"
            v-model="step.descr"
          />
          <div class="help-block" :class="{ show: $v.step.descr.$error }">
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
  name: "ProcessEdit",
  computed: {
    ...mapGetters("processStep", {
      step: "processStep"
    })
  },
  validations: {
    step: {
      name: {
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
      if (!this.$v.step.$invalid) {
        this.$store.dispatch("processStep/update", this.step).then(() => {
          this.goBack();
        });
      }
    },
    goBack() {
      this.$router.push("/components/step");
    }
  },
  created() {
    this.$store.dispatch("processStep/findById", this.$route.params.id);
  }
};
</script>
