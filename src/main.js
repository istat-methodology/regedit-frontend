import Vue from "vue";

//Vue core
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

//Icons
import { iconsSet as icons } from "@/assets/icons/coreui.js";
import "@/assets/icons/material";

//Vue global plugins
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueSpinners from "vue-spinners";

//CoreUI components
import "@/coreui";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueSpinners);
Vue.component("v-select", vSelect);

Vue.filter("dashEmpty", value => {
  return value == null || value == "" ? "-" : value;
});

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");
