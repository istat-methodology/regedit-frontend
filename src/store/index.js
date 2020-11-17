import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { addressServ } from "./modules/metadata/addressService";
import { user } from "./modules/user/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    addressServ,
    user
  }
});
