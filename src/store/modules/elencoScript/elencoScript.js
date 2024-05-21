import { elencoScriptService } from "@/services";
import { getUserId } from "@/common";

const state = {
  elencoScript: null
};

const mutations = {
  SET_ELENCO(state, elenco) {
    state.elencoScript = elenco;
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
  }
};

const getters = {
  elencoScript: state => {
    return state.elencoScript;
  }
};

export const elenco = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
