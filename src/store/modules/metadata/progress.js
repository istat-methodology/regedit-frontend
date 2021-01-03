import { progressService } from "@/services";

const state = {
  reports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports;
  }
};

const actions = {
  findByUser({ commit, rootGetters }) {
    let user = rootGetters["auth/user"];
    if (user) {
      return progressService
        .findByUser(user.userId)
        .then(data => {
          //console.log(data);
          commit("SET_REPORTS", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  reports: state => {
    return state.reports;
  }
};

export const progress = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
