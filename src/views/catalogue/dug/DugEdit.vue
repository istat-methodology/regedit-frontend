<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="dug">
    <div class="col-12">
      <CCard>
        <CCardHeader>Dug</CCardHeader>
        <CCardBody>
          <CInput
            label="Name"
            placeholder="Name"
            :class="{ 'is-invalid': $v.dug.dug.$error }"
            v-model="dug.dug"
          />
          <div class="help-block" :class="{ show: $v.dug.dug.$error }">
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
            @click.prevent="backToList"
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
  name: "DugEdit",
  computed: {
    ...mapGetters("dugServ", {
      dug: "dug"
    })
  },
  validations: {
    dug: {
      dug: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.dug.$invalid) {
        this.$store.dispatch("dugServ/update", this.dug).then(() => {
          this.backToList();
        });
      }
    },
    backToList() {
      this.$router.push("/catalogue/dug");
    }
  },
  created() {
    this.$store.dispatch("dugServ/findById", this.$route.params.id);
  }
};
</script>
