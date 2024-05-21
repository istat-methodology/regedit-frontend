import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { address } from "./modules/address/address";
import { toponimo } from "./modules/toponimo/toponimi";
import { dug } from "./modules/address/dug";
import { user } from "./modules/user/user";
import { role } from "./modules/user/role";
import { progress } from "./modules/report/progress";
import { progressTop } from "./modules/report/progressTop";
import { daily } from "./modules/report/daily";
import { pivot } from "./modules/report/pivot";
import { pivotTop } from "./modules/report/pivotTop";
import { version } from "./modules/versioning/appversion";
import { elencoComuni } from "./modules/comuni/comuni";
import { elencoProvince } from "./modules/province/province";
import { elencoProvinceScript } from "./modules/province/provinceScript";
import { valueScript } from "./modules/province/runRScript";
import { scriptRunning } from "./modules/script/script";
import { massive } from "./modules/massive/massive";
import { massiveTop } from "./modules/massive/massiveTop";
import { massiveTopVal } from "./modules/massive/massiveTopVal";
import { customswitch } from "./modules/switch/customswitch";
import { csv } from "./modules/exportCSV/exportCSV";
import { archivio } from "./modules/archivio/archivio";
import { tabella } from "./modules/tabellaScript/tabellaScript";
import { elenco } from "./modules/elencoScript/elencoScript";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    address,
    toponimo,
    dug,
    user,
    progress,
    progressTop,
    daily,
    pivot,
    pivotTop,
    version,
    elencoComuni,
    elencoProvince,
    elencoProvinceScript,
    valueScript,
    scriptRunning,
    massive,
    massiveTop,
    massiveTopVal,
    customswitch,
    role,
    csv,
    archivio,
    tabella,
    elenco
  }
});
