import { comuniService } from "@/services";

const state = {
  comuni: null
};

const mutations = {
  SET_COMUNI(state, comuni) {
    state.comuni = comuni;
  }
};

const actions = {
  findComuniByUser({ commit }, user, state) {
    return comuniService
      .findComuniByUser(user, state)
      .then(data => {
        //console.log(data);
        commit("SET_COMUNI", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  comuni: state => {
    return state.comuni;
  }
};

export const elencoComuni = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
