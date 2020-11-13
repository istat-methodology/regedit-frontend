<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          Process
        </CCardHeader>
        <CCardBody>
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-2', content: 'col-md-10' }"
            :active-tab="activeTab"
          >
            <CTab>
              <template #title>
                <span>Basic</span>
              </template>
              <div class="row">
                <div class="col-6">
                  <CCard class="card-no-border">
                    <CCardBody>
                      <CInput
                        label="Name"
                        placeholder="Name"
                        :class="{ 'is-invalid': $v.process.name.$error }"
                        v-model="process.name"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.process.name.$error }"
                      >
                        This field is required
                      </div>
                      <CInput
                        label="Label"
                        placeholder="Label"
                        :class="{ 'is-invalid': $v.process.label.$error }"
                        v-model="process.label"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.process.label.$error }"
                      >
                        This field is required
                      </div>
                      <CTextarea
                        rows="3"
                        label="Description"
                        placeholder="Description"
                        :class="{ 'is-invalid': $v.process.description.$error }"
                        v-model="process.description"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.process.description.$error }"
                      >
                        This field is required
                      </div>
                      <CInput
                        label="Organization"
                        placeholder="Organization"
                        :class="{
                          'is-invalid': $v.process.organization.$error
                        }"
                        v-model="process.organization"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.process.organization.$error }"
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
                    </CCardFooter>
                  </CCard>
                </div>
              </div>
            </CTab>
            <CTab title="Workflow" disabled> </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProcessAdd",
  data() {
    return {
      activeTab: 0,
      process: {
        name: "",
        description: "",
        label: "",
        organization: ""
      }
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
      if (!this.$v.process.$invalid) {
        this.$store
          .dispatch("businessProcess/save", this.process)
          .then(data => {
            this.$router.push("/catalogue/process/edit/" + data.id + "?step=2");
          });
      }
    },
    goBack() {
      this.$router.push("/catalogue/process");
    }
  }
};
</script>
