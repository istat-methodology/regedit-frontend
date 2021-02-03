import { pivotReportService } from "@/services";

const state = {
  pivotReports: null,
  pivotReportsByDate: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.pivotReports = reports;
  },
  SET_REPORTSBYDATE(state, reports) {
    state.pivotReportsByDate = reports;
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
  },

  findByDate({ commit }, payload) {
    return pivotReportService
      .findByDate(payload.id, payload.start, payload.end)
      .then(data => {
        commit("SET_REPORTSBYDATE", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByDateTotal({ commit }, payload) {
    return pivotReportService
      .findByDateTotal(payload.start, payload.end)
      .then(data => {
        commit("SET_REPORTSBYDATE", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  reports: state => {
    return state.pivotReports;
  },
  reportsByDate: state => {
    return state.pivotReportsByDate;
  }
};

export const pivot = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
