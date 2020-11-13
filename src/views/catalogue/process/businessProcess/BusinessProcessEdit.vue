<template>
  <!-- wait until process is loaded -->
  <div class="row" v-if="process">
    <div class="col-12">
      <CCard>
        <CCardHeader>Edit process: {{ process.name }}</CCardHeader>
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
                <span class="float-right" v-if="editedProcess"
                  ><success-icon
                /></span>
              </template>
              <div class="row">
                <div class="col-6">
                  <app-business-process-domain
                    :process="process"
                    @update="handleUpdateProcess"
                  />
                </div>
              </div>
            </CTab>
            <CTab>
              <template #title>
                <span>Workflow</span>
                <span class="float-right" v-if="editedWorkflow"
                  ><success-icon
                /></span>
              </template>
              <app-flow
                :nodePool="steps"
                :nodes="nodes"
                :connections="connections"
                displayBack="true"
                @saveGraph="handleSaveGraph"
                @back="handleBack"
              >
                <template #footer>
                  <CButton
                    shape="square"
                    size="sm"
                    color="primary"
                    class="mr-2"
                    @click.prevent="handleBack"
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
              </app-flow>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BusinessProcessDomain from "./BusinessProcessDomain";
import Flow from "@/components/Flow";

export default {
  name: "ProcessEdit",
  components: {
    "app-business-process-domain": BusinessProcessDomain,
    "app-flow": Flow
  },
  data() {
    return {
      activeTab: 0,
      editedProcess: false,
      editedWorkflow: false
    };
  },
  computed: {
    ...mapGetters("businessProcess", { process: "businessProcess" }),
    ...mapGetters("processStep", { steps: "processSteps" }),
    nodes() {
      return this.process.graph && this.process.graph.nodes
        ? this.process.graph.nodes
        : [];
    },
    connections() {
      return this.process.graph && this.process.graph.connections
        ? this.process.graph.connections
        : [];
    }
  },
  methods: {
    handleUpdateProcess(process, fieldsChanged) {
      if (fieldsChanged) {
        this.$store.dispatch("businessProcess/update", process);
        this.editedProcess = true;
      }
      this.next();
    },
    handleSaveGraph(graph) {
      var updatedProcess = { ...this.process, graph: graph };
      this.$store.dispatch("businessProcess/updateGraph", updatedProcess);
      this.editedWorkflow = true;
    },
    handleBack() {
      this.back();
    },
    backToList() {
      this.$router.push("/catalogue/process/");
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
    this.$store.dispatch("businessProcess/findById", this.$route.params.id);
    this.$store.dispatch("processStep/findAll");
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  }
};
</script>

<style scoped>
.tab-content > .active {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
}
</style>
