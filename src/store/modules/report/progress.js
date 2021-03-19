import { progressReportService } from "@/services";
import { getUserId } from "@/common";

const state = {
  reports: null,
  selezionati: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports;
  },
  INC_SELEZIONATI(state) {
    state.selezionati++;
  },
  DEC_SELEZIONATI(state) {
    state.selezionati--;
  },
  RESET_SELEZIONATI(state) {
    state.selezionati = 0;
  }
};

const actions = {
  findByUser({ commit }) {
    let userId = getUserId();
    if (userId > 0) {
      return progressReportService
        .findByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_REPORTS", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  incSelected({ commit }) {
    commit("INC_SELEZIONATI");
  },
  decSelected({ commit }) {
    commit("DEC_SELEZIONATI");
  },
  resetSelected({ commit }) {
    commit("RESET_SELEZIONATI");
  }
};

const getters = {
  reports: state => {
    return state.reports;
  },
  selezionati: state => {
    return state.selezionati;
  }
};

export const progress = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
