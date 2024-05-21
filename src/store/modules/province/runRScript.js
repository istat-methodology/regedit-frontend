import { provinceService } from "@/services";
import { getUserId } from "@/common";

const state = {
  returnValueScript: null
};

const mutations = {
  SET_RETURNSCRIPT(state, returnValueScript) {
    state.returnValueScript = returnValueScript;
  }
};

const actions = {
  execScript({ commit }, payload) {
    //get user from store
    let userId = getUserId();
    commit("SET_RETURNSCRIPT", "");
    if (userId > 0) {
      return provinceService
        .executeScript(payload)
        .then(data => {
          //console.log(data);
          commit("SET_RETURNSCRIPT", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  returnValueScript: state => {
    return state.returnValueScript;
  }
};

export const valueScript = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
