import { dailyRepService } from "@/services";

const state = {
  dailyReports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.dailyReports = reports;
  }
};

const actions = {
  findByUser({ commit }, user) {
    if (user) {
      return dailyRepService
        .findByUser(user)
        .then(data => {
          //console.log(data);
          commit("SET_REPORTS", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findAll({ commit }) {
    return dailyRepService
      .findAll()
      .then(data => {
        commit("SET_REPORTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  reports: state => {
    return state.dailyReports;
  }
};

export const dailyReport = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
