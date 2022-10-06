import { pivotReportTopService } from "@/services";

const state = {
  pivotReportsTop: null,
  pivotReportsByDateTop: null
};

const mutations = {
  SET_REPORTS(state, reportsTop) {
    state.pivotReportsTop = reportsTop;
  },
  SET_REPORTSBYDATE(state, pivotReportsByDateTop) {
    state.pivotReportsByDateTop = pivotReportsByDateTop;
  }
};

const actions = {
  findAll({ commit }) {
    return pivotReportTopService
      .findAll()
      .then(data => {
        commit("SET_REPORTS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByDate({ commit }, payload) {
    return pivotReportTopService
      .findByDate(payload.id, payload.start, payload.end)
      .then(data => {
        commit("SET_REPORTSBYDATE", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByDateTotal({ commit }, payload) {
    return pivotReportTopService
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
  reportsTop: state => {
    return state.pivotReportsTop;
  },
  reportsByDateTop: state => {
    return state.pivotReportsByDateTop;
  }
};

export const pivotTop = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
