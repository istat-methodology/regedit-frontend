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
        :value="isToponimi"
        @update:checked="$emit('toggleSwitch', isToponimi)"
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
  data: function() {
    return {
      switch: null,
      color: "success",
      shape: "square"
    };
  },
  computed: {
    ...mapGetters("customswitch", ["isToponimi"])
    /* checkToponimi() {
      return this.isToponimi;
    }, */
    /* toggleToponimi() {
      console.log("this.isToponimi");
      return this.$emit("toggleSwitch", this.isToponimi);
    } */

    /* toggleToponimi() {
      return this.$store.dispatch("customswitch/setToponimi", !this.isToponimi);
    } */
  },
  created() {
    this.$store.dispatch("customswitch/setToponimi", false);
  }
  /* methods: {
    toggleToponimi: function () {
      console.log(this.isToponimi);
      return this.$emit("toggleSwitch", this.isToponimi);
    },
  }, */
};
</script>
