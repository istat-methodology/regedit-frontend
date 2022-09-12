<template>
  <div class="c-subheader-nav mfe-2">
    <template>
      <div class="row">
        <div class="col-sm-3 col-md-3">
         <span>Indirizzi</span>
        </div>
        <div class="col-sm-3 col-md-3">
          <CSwitch
            :shape="shape"
            :color="color"
            v-bind:show="true"
            checked
            :value="true"
            labelOn="Top."
            labelOff="Ind."
            :size="lg"
          />
        </div>
        <div class="col-sm-3 col-md-3">
         <span>Toponimi</span>
        </div>
      </div>
    </template>
    <template v-if="isSupervisor">
      <span class="revisore">Revisore:</span>
      <span class="revisore-name pl-1 pr-2">
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
export default {
  name: "HeaderNav",
  data: function() {
    return {
      switch1: true,
      color: "primary",
      shape: "square",
    };
  },
  computed: {
    ...mapGetters("coreui", ["isHome"]),
    ...mapGetters("auth", ["isSupervisor", "isReviewer"]),
    ...mapGetters("address", ["assignedId", "assignedName"]),
  },
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
