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
        @update:checked="$emit('toggleSwitch')"
        :checked="isToponimi === true"
        labelOn="Top."
        labelOff="Ind."
      />
    </div>
    <div class="col-sm-3 col-md-3">
      <span>Toponimi</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomSwitch",
  /*  props: {
    statoSwitch: Boolean
  }, */
  data: function() {
    return {
      //switch: null,
      color: "success",
      shape: "square"
    };
  },
  computed: {
    ...mapGetters("customswitch", ["isToponimi"])
  }
};
</script>
