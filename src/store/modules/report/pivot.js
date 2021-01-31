import { pivotReportService } from "@/services";

const state = {
  pivotReports: null,
  pivotReportsByDate: null,
  pivotReportsByDateTotal: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.pivotReports = reports;
  },
  SET_REPORTSBYDATE(state, reports) {
    state.pivotReportsByDate = reports;
  },
  SET_REPORTSBYDATETOTAL(state, reports) {
    state.pivotReportsByDateTotal = reports;
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

  findByDate({ commit }, user, start, end) {
    return pivotReportService
      .findByDate(user, start, end)
      .then(data => {
        commit("SET_REPORTSBYDATE", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByDateTotal({ commit }, start, end) {
    return pivotReportService
      .findByDateTotal(start, end)
      .then(data => {
        commit("SET_REPORTSBYDATETOTAL", data);
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
  },
  reportsByDateTotal: state => {
    return state.pivotReportsByDateTotal;
  }
};

export const pivot = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
