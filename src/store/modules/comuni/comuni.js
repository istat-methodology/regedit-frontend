import { comuniService } from "@/services";
import { getUserId } from "@/common";

const state = {
  comuni: null
};

const mutations = {
  SET_COMUNI(state, comuni) {
    state.comuni = comuni;
  }
};

const actions = {
  findComuniByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return comuniService
        .findComuniByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_COMUNI", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findTopComuniByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return comuniService
        .findTopComuniByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_COMUNI", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findComuniByUserAndState({ commit }, state) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return comuniService
        .findComuniByUserAndState(userId, state)
        .then(data => {
          //console.log(data);
          commit("SET_COMUNI", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findTopComuniByUserAndState({ commit }, state) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return comuniService
        .findTopComuniByUserAndState(userId, state)
        .then(data => {
          //console.log(data);
          commit("SET_COMUNI", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
