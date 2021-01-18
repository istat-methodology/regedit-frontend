import { pivotReportService } from "@/services";

const state = {
  pivotReports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.pivotReports = reports;
  }
};

const actions = {
  findAll({ commit }) {
    return pivotReportService
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
    return state.pivotReports;
  }
};

export const pivot = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
