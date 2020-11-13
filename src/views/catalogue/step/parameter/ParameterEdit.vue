<template>
  <!-- wait until parameter is loaded -->
  <div class="row" v-if="parameter">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          {{ parameter.name }}
        </CCardHeader>
        <CCardBody>
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-2', content: 'col-md-10' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab>
              <template #title>
                <span>Basic</span>
                <span class="float-right" v-if="editedParameter"
                  ><success-icon
                /></span>
              </template>
              <div class="row">
                <div class="col-6">
                  <CCard class="card-no-border">
                    <CCardBody>
                      <CInput
                        label="Name*"
                        placeholder="Name"
                        :class="{ 'is-invalid': $v.parameter.name.$error }"
                        v-model="parameter.name"
                        @change="editedParameter = true"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.parameter.name.$error }"
                      >
                        This field is required
                      </div>
                      <CInput
                        label="Default value"
                        placeholder="Default value"
                        v-model="parameter.default_val"
                        @change="editedParameter = true"
                      />
                      <div class="help-block">
                        This field is required
                      </div>
                      <CTextarea
                        rows="3"
                        label="Description*"
                        placeholder="Description"
                        :class="{ 'is-invalid': $v.parameter.descr.$error }"
                        v-model="parameter.descr"
                        @change="editedParameter = true"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.parameter.descr.$error }"
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
            <CTab>
              <template #title>
                <span>Json template</span>
                <span class="float-right" v-if="editedJson"
                  ><success-icon
                /></span>
              </template>

              <app-json-editor
                :jsonObject="parameter.json_template"
                @input="onInput"
                @error="onError"
              >
                <template #footer>
                  <CButton
                    shape="square"
                    size="sm"
                    color="primary"
                    class="mr-2"
                    @click.prevent="handleUpdateJson"
                    >Prev</CButton
                  >
                  <CButton
                    shape="square"
                    size="sm"
                    color="light"
                    @click.prevent="backToList"
                    >Back</CButton
                  >
                </template>
              </app-json-editor>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import JsonEditor from "@/components/JsonEditor";

export default {
  name: "ParameterEdit",
  components: {
    "app-json-editor": JsonEditor
  },
  data() {
    return {
      activeTab: 0,
      editedParameter: false,
      editedJson: false
    };
  },
  computed: {
    ...mapGetters("parameter", ["parameter"])
  },
  validations: {
    parameter: {
      name: {
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
      if (!this.$v.parameter.$invalid && this.editedParameter) {
        this.$store.dispatch("parameter/update", this.parameter);
      }
      this.next();
    },
    onError() {
      console.log("error");
    },
    onInput(jsonObj) {
      this.editedJson = true;
      this.parameter.json_template = jsonObj;
    },
    handleUpdateJson() {
      if (this.editedJson) {
        this.$store.dispatch("parameter/update", this.parameter);
      }
      this.back();
    },
    backToList() {
      this.$router.push("/components/parameter");
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    }
  },
  created() {
    this.$store.dispatch("parameter/findById", this.$route.params.id);
  }
};
</script>
