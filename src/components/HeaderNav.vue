<template>
  <div class="c-subheader-nav mfe-2">
    <!-- <header-switch @toggleSwitch="onSwitch"></header-switch> -->
    <div class="c-subheader-nav mfe-2">
      <CButton
        v-if="isToponimi"
        shape="square"
        variant="outline"
        size="sm"
        color="success"
        @click="Switch"
        >Toponimi</CButton
      >
      <CButton
        v-else
        shape="square"
        variant="outline"
        size="sm"
        color="primary"
        @click="Switch"
        >Indirizzi</CButton
      >
    </div>
    <template v-if="isSupervisor">
      <span class="revisore">Revisore:</span>
      <span v-if="isToponimi" class="revisore-name pl-1 pr-2">
        {{ assignedTopName | dashEmpty }}</span
      >
      <span v-else class="revisore-name pl-1 pr-2">
        {{ assignedName | dashEmpty }}</span
      >
    </template>
    <template v-else>
      <a href=" https://www.google.it/maps" target="_blank" class="pr-3"
        >Google maps</a
      >
      <a
        href=" http://maldive:8080/egonweb/main.action"
        target="_blank"
        class="pr-2"
        >Egon</a
      >
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import HeaderSwitch from "@/components/HeaderSwitch";
export default {
  name: "HeaderNav",
  data: function() {
    return {
      switch1: true,
      color: "primary",
      shape: "square"
    };
  },
  /* components: {
    "header-switch": HeaderSwitch
  }, */
  computed: {
    ...mapGetters("coreui", ["isHome"]),
    ...mapGetters("auth", ["isSupervisor", "isReviewer"]),
    ...mapGetters("address", ["assignedId", "assignedName"]),
    ...mapGetters("toponimo", ["assignedTopId", "assignedTopName"]),
    ...mapGetters("customswitch", ["isToponimi"])
  },
  methods: {
    Switch() {
      //console.log(checkval);
      if (this.$route.path != "/") {
        this.$router.push("/").catch(() => {});
      }
      return this.$store.dispatch("customswitch/setToponimi", !this.isToponimi);
    }
  }
};
</script>

<style scoped>
.revisore {
  color: #3c4b64;
}
.revisore-name {
  color: #321fdb;
}
</style>
