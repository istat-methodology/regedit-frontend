import { dailyReportService } from "@/services";

const state = {
  dailyReports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.dailyReports = reports;
  }
};

const actions = {
  findAll({ commit }) {
    return dailyReportService
      .findAll()
      .then(data => {
        commit("SET_REPORTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByUser({ commit }, user) {
    if (user) {
      return dailyReportService
        .findByUser(user)
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
    return state.dailyReports;
  }
};

export const daily = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
