import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { businessProcess } from "./modules/metadata/businessProcess";
import { businessService } from "./modules/metadata/businessService";
import { processStep } from "./modules/metadata/processStep";
import { parameter } from "./modules/metadata/parameter";
import { approle } from "./modules/metadata/appRole";
import { stepInstance } from "./modules/metadata/stepInstance";
import { user } from "./modules/user/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    businessProcess,
    businessService,
    processStep,
    parameter,
    stepInstance,
    approle,
    user
  }
});
