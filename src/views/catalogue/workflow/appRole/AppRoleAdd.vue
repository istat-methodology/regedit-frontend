<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <CCard>
        <CCardHeader>
          Parameter
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Code*"
            placeholder="Code"
            :class="{ 'is-invalid': $v.approle.code.$error }"
            v-model="approle.code"
          />
          <div class="help-block" :class="{ show: $v.approle.code.$error }">
            This field is required
          </div>
          <CInput
            label="Name*"
            placeholder="Name"
            :class="{ 'is-invalid': $v.approle.name.$error }"
            v-model="approle.name"
          />
          <div class="help-block" :class="{ show: $v.approle.name.$error }">
            This field is required
          </div>
          <CTextarea
            rows="3"
            label="Description*"
            placeholder="Description"
            :class="{ 'is-invalid': $v.approle.descr.$error }"
            v-model="approle.descr"
          />
          <div class="help-block" :class="{ show: $v.approle.descr.$error }">
            This field is required
          </div>
          <CInput
            label="Order"
            placeholder="Order"
            v-model="approle.order_code"
          />
          <div class="help-block">
            This field is required
          </div>
          <CInput
            label="Data type*"
            placeholder="Data type"
            :class="{ 'is-invalid': $v.approle.cls_data_type_id.$error }"
            v-model="approle.cls_data_type_id"
          />
          <div
            class="help-block"
            :class="{ show: $v.approle.cls_data_type_id.$error }"
          >
            This field is required
          </div>
          <CInput
            label="Parameter"
            placeholder="Parameter"
            v-model="approle.parameter_id"
          />
          <div class="help-block">
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
            >Save</CButton
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
  name: "ParameterAdd",
  data() {
    return {
      approle: {
        code: "",
        name: "",
        descr: "",
        order_code: "",
        cls_data_type_id: "",
        parameter_id: ""
      }
    };
  },
  validations: {
    approle: {
      code: {
        required
      },
      name: {
        required
      },
      descr: {
        required
      },
      cls_data_type_id: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.approle.$invalid) {
        this.$store.dispatch("approle/save", this.approle).then(() => {
          this.goBack();
        });
      }
    },
    goBack() {
      this.$router.push("/components/approle");
    }
  }
};
</script>
