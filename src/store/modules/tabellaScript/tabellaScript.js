import { tabellaScriptService } from "@/services";
import { getUserId } from "@/common";

const state = {
  tabellaScript: null
};

const mutations = {
  SET_TABELLA(state, tabella) {
    state.tabellaScript = tabella;
  }
};

const actions = {
  findTabellaByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return tabellaScriptService
        .findTabellaByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_TABELLA", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findTabellaByUserAndProc({ commit }, payload) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return tabellaScriptService
        .findTabellaByUserAndProc(userId, payload)
        .then(data => {
          console.log(data);
          commit("SET_TABELLA", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  tabellaScript: state => {
    return state.tabellaScript;
  }
};

export const tabella = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
