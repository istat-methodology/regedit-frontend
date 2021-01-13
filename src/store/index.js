import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { address } from "./modules/metadata/address";
import { dug } from "./modules/metadata/dug";
import { user } from "./modules/user/user";
import { progress } from "./modules/metadata/progress";
import { dailyReport } from "./modules/metadata/dailyreport";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    address,
    dug,
    user,
    progress,
    dailyReport
  }
});
