<template>
  <CFooter :fixed="false">
    <div>
      <span class="mr-1">Open source project</span>
      <a
        href="https://github.com/istat-methodology/regedit-frontend"
        target="_blank"
        >@github</a
      >
    </div>
    <div class="ml-auto">
      <span class="mr-1">Version: {{ appVersion }}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
    </div>
  </CFooter>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters("version", ["appVersion"])
  }
};
</script>
