import { progressService } from "@/services";

const state = {
  progresses: null
};

const mutations = {
  SET_PROGRESSES(state, progresses) {
    state.progresses = progresses;
  }
};

const actions = {
  findByUser({ commit }, user) {
    return progressService
      .findByUser(user)
      .then(data => {
        //console.log(data);
        commit("SET_PROGRESSES", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  progress: state => {
    return state.progresses;
  }
};

export const progress = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
