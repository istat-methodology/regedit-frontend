import { elencoScriptService } from "@/services";
import { getUserId } from "@/common";

const state = {
  elencoScript: null,
  lastScriptRunning: null
};

const mutations = {
  SET_ELENCO(state, elenco) {
    state.elencoScript = elenco;
  },
  SET_SCRIPTRUNNING(state, scriptRunning) {
    state.lastScriptRunning = scriptRunning;
  }
};

const actions = {
  findElencoByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return elencoScriptService
        .findElencoByUser(userId)
        .then(data => {
          //console.log(data);
          var newlist = data.map((items, index = 0) => ({
            ...items,
            index: index + 1
          }));
          commit("SET_ELENCO", newlist);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findScriptRunningByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return elencoScriptService
        .findScriptRunningByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_SCRIPTRUNNING", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  elencoScript: state => {
    return state.elencoScript;
  },
  lastScriptRunning: state => {
    return state.lastScriptRunning;
  }
};

export const elenco = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
