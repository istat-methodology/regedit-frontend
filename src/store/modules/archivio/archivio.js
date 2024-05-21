import { provinceService } from "@/services";
import { getUserId } from "@/common";

const state = {
  archivioCodes: null
};

const mutations = {
  SET_ARCHIVIOCODES(state, archivioCodes) {
    state.archivioCodes = archivioCodes;
  }
};

const actions = {
  findArchivioCodes({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return provinceService
        .findArchivioCodes()
        .then(data => {
          //console.log(data);
          commit("SET_ARCHIVIOCODES", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  archivioCodes: state => {
    return state.archivioCodes;
  }
};

export const archivio = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
