import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { address } from "./modules/address/address";
import { dug } from "./modules/address/dug";
import { user } from "./modules/user/user";
import { role } from "./modules/user/role";
import { progress } from "./modules/report/progress";
import { daily } from "./modules/report/daily";
import { pivot } from "./modules/report/pivot";
import { version } from "./modules/versioning/appversion";
import { elencoComuni } from "./modules/comuni/comuni";
import { massive } from "./modules/massive/massive";

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
    daily,
    pivot,
    version,
    elencoComuni,
    massive,
    role
  }
});
