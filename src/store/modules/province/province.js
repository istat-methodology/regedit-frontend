import { comuniService } from "@/services";
import { getUserId } from "@/common";

const state = {
  province: null
};

const mutations = {
  SET_COMUNI(state, province) {
    state.province = province;
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
  province: state => {
    return state.province;
  }
};

export const elencoProvince = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
