<template>
  <div>
    <CToaster :autohide="1000" position="top-center">
      <template v-if="message">
        <CToast :key="message" :show="true" :class="type">
          <template> <success-icon /> {{ getMessage }}</template>
        </CToast>
      </template>
    </CToaster>
  </div>
</template>

<script>
import { CToaster, CToast } from "@coreui/vue";
import { mapGetters } from "vuex";

export default {
  name: "Toast",
  components: {
    CToaster,
    CToast
  },
  computed: {
    ...mapGetters("message", ["message", "type"]),
    getMessage() {
      return this.message.split("#").pop();
    }
  }
};
</script>

<style scoped>
.toaster .toast {
  width: 100%;
  padding: 0.2rem 0.4rem;
}

.toast-info {
  background-image: none;
  color: #1b508f;
  background-color: #c6e2ff;
  border-color: #c6e2ff;
}

.toast-error {
  background-image: none;
  color: #813838;
  background-color: #fee2e1;
  border-color: #fdd6d6;
}

.toast-success {
  background-image: none;
  background-color: #dbf2e3;
  border-color: #c4ebd1;
  color: #18603a;
}

.toast-warning {
  background-image: none;
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}
</style>
