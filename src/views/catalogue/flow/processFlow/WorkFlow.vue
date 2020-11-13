<template>
  <div v-if="processes">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <CCard>
          <CCardHeader>
            Business processes
          </CCardHeader>
          <CCardBody>
            <v-select
              label="name"
              :options="processes"
              v-model="process"
              placeholder="Select a process"
              @input="handleSelectInput"
            ></v-select>
          </CCardBody>
        </CCard>
      </div>
    </div>
    <app-flow
      :nodePool="processSteps"
      :nodes="nodes"
      :connections="connections"
      @saveGraph="handleSaveGraph"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Flow from "@/components/Flow";

export default {
  name: "WorkFlow",
  components: {
    "app-flow": Flow
  },
  data: function() {
    return {
      process: null,
      nodes: [],
      connections: []
    };
  },
  computed: {
    ...mapGetters("businessProcess", { processes: "businessProcesses" }),
    ...mapGetters("processStep", ["processSteps"])
  },
  methods: {
    handleSelectInput() {
      //if process has a graph
      if (this.process != null && this.process.graph) {
        this.nodes = this.process.graph.nodes;
        this.connections = this.process.graph.connections;
      } else {
        this.nodes = [];
        this.connections = [];
      }
    },
    handleSaveGraph(graph) {
      //check if process is selected
      if (this.process == null) {
        alert("Please select a process!");
      } else {
        var updatedProcess = {
          id: this.process.id,
          name: this.process.name,
          description: this.process.description,
          organization: this.process.organization,
          graph: graph
        };
        this.$store.dispatch("businessProcess/updateGraph", updatedProcess);
      }
    }
  },
  created() {
    this.$store.dispatch("businessProcess/findAll");
    this.$store.dispatch("processStep/findAll");
  }
};
</script>
