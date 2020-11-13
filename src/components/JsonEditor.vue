<template>
  <CCard class="card-no-border">
    <CCardBody>
      <v-jsoneditor
        v-model="localJsonObject"
        :options="options"
        :plus="plus"
        :height="height"
        @error="onError"
      />
    </CCardBody>
    <CCardFooter class="editor-footer">
      <slot name="footer">
        <!-- Add a footer if needed -->
      </slot>
    </CCardFooter>
  </CCard>
</template>
<script>
export default {
  name: "JsonEditor",
  props: {
    jsonObject: {
      Type: Object,
      default: () => {}
    },
    options: {
      Type: Object,
      default: () => {
        return { mode: "code", enableSort: false, enableTransform: false };
      }
    },
    height: {
      Type: String,
      default: "400px"
    },
    plus: {
      Type: Boolean,
      default: true
    }
  },
  computed: {
    localJsonObject: {
      get: function() {
        return this.jsonObject;
      },
      set: function(jsonObj) {
        this.$emit("input", jsonObj);
      }
    }
  },
  methods: {
    onError(error) {
      console.log(error);
      this.$emit("error", error);
    }
  }
};
</script>

<style>
.editor-footer {
  border-top: none;
  margin-top: 30px;
}
.jsoneditor {
  border: 1px solid #d8dbe0;
  color: #3c4b64;
}
.jsoneditor-menu {
  border: 1px solid #321fdb;
  background-color: #321fdb;
  border-bottom: 1px solid #d8dbe0;
}
.ace-jsoneditor .ace_gutter {
  background-color: #fafafa;
  color: #3c4b64;
}
.ace-jsoneditor .ace_gutter-active-line {
  background-color: #d8dbe0;
}
.jsoneditor-statusbar {
  background-color: #fafafa;
  border: 1px solid #d8dbe0;
  color: #3c4b64;
}
.jsoneditor-tree,
.jsoneditor textarea.jsoneditor-text {
  background-color: #ffffff;
  color: #3c4b64;
}
.jsoneditor-field,
.jsoneditor-value {
  color: #3c4b64 !important;
}
.max-btn {
  display: inline;
}
</style>
