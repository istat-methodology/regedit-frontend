<template>
  <div class="row">
    <div class="col-sm-3 col-md-3">
      <CCard>
        <CCardHeader>
          Process steps
        </CCardHeader>
        <CCardBody>
          <draggable :list="nodePool" ghost-class="ghost" @end="onEnd">
            <transition-group type="transition" name="step-list">
              <CAlert
                color="secondary"
                v-for="node in nodePool"
                :id="node.id"
                :key="node.id"
              >
                <cog-icon class="mr-2" /><span>{{ node.name }} </span>
              </CAlert>
            </transition-group>
          </draggable>
        </CCardBody>
      </CCard>
    </div>
    <div class="col-sm-9 col-md-9">
      <CCard>
        <CCardHeader>Workflow</CCardHeader>
        <CCardBody>
          <CButtonGroup class="pb-2" v-if="!readonly">
            <CButton
              shape="square"
              size="sm"
              color="primary"
              class="mr-2"
              @click="$refs.chart.remove()"
            >
              Delete Element
            </CButton>
            <CButton
              shape="square"
              size="sm"
              color="primary"
              @click="$refs.chart.save()"
            >
              Save graph
            </CButton>
          </CButtonGroup>
          <flowchart
            :width="width"
            :height="height"
            :nodes="nodes"
            :connections="connections"
            @editnode="handleEditNode"
            @save="handleChartSave"
            :render="render"
            :readonly="readonly"
            ref="chart"
          >
          </flowchart>
        </CCardBody>
        <CCardFooter>
          <slot name="footer">
            <!-- Add a footer if needed -->
          </slot>
        </CCardFooter>
      </CCard>
      <!-- Node modal-->
      <CModal :show.sync="nodeDialog" title="Step">
        <div class="form-group-plain">
          <label for="Name">Name</label>
          <span class="form-control-plain">{{ nodeName }}</span>
        </div>
        <div class="form-group-plain">
          <label for="Description">Description</label>
          <span class="form-control-plain">{{ nodeDescription }}</span>
        </div>
        <template #footer>
          <CButton
            shape="square"
            size="sm"
            color="primary"
            @click="nodeModalClose()"
          >
            Close
          </CButton>
        </template>
      </CModal>
    </div>
  </div>
</template>
<script>
import { render } from "@/common"; //flowchart render function
import { nodeType } from "@/common";
import draggable from "vuedraggable";

export default {
  name: "Flow",
  components: {
    draggable
  },
  props: {
    nodePool: {
      Type: Array,
      default: () => []
    },
    nodes: {
      Type: Array,
      default: () => []
    },
    connections: {
      Type: Array,
      default: () => []
    },
    width: {
      Type: Number,
      default: "800"
    },
    height: {
      Type: Number,
      default: "400"
    },
    readonly: {
      Type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      nodeForm: { target: null },
      nodeDialog: false,
      nodeName: "",
      nodeType: "",
      nodeDescription: ""
    };
  },
  methods: {
    render,
    addNode(node) {
      this.$refs.chart.add({
        //canvas node properties
        id: +new Date(),
        x: node.x,
        y: node.y,
        type: nodeType.Operation,
        //process node
        idnode: node.id,
        name: node.name,
        description: node.descr
      });
    },
    handleEditNode(node) {
      this.nodeName = node.name;
      this.nodeDescription = node.description;
      this.nodeType = node.type;
      this.nodeForm.target = node;
      this.nodeDialog = true;
    },
    nodeModalClose() {
      this.nodeDialog = false;
    },
    handleChartSave(nodes, connections) {
      var graph = {
        nodes: nodes,
        connections: connections
      };
      this.$emit("saveGraph", graph);
    },
    //drop pool node
    onEnd(event) {
      var node = this.getPoolNode(event.item.id);
      node.x = event.item.offsetWidth % (this.width - 80);
      node.y = event.item.offsetTop % (this.height - 100);
      //console.log ("x: " + node.x + ", y: " + node.y);
      if (typeof node !== "undefined") this.addNode(node);
    },
    getPoolNode(nodeId) {
      return this.nodePool.find(node => node.id === parseInt(nodeId));
    }
  }
};
</script>

<style scoped>
.modal-header {
  padding: 0.75rem;
}
.alert {
  position: relative;
  padding: 0.5rem 1rem 0.5rem 1.25rem;
  margin-bottom: 0.8rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-color: #d8dbe0;
  font-size: 0.8rem;
}
.alert:hover {
  cursor: pointer;
}
.alert-secondary {
  color: #3c4b64;
}
.form-group-plain {
  margin-bottom: 0.2rem;
}
.form-group-plain > label {
  display: inline-block;
  margin-bottom: 0.2rem;
  font-weight: 600;
}
.form-control-plain {
  display: block;
  width: 100%;
  padding: 0rem;
  padding-bottom: 0.8rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  color: #768192;
  background-color: #fff;
  border-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.sortable-chosen {
  cursor: move;
}
/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.sortable-chosen:active {
  cursor: move;
}
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
.card-body {
  overflow-x: auto;
  overflow-y: auto;
}
</style>
