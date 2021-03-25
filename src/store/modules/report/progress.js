import { progressReportService } from "@/services";
import { getUserId } from "@/common";

const state = {
  reports: null,
  selezionati: null,
  selezionatiSospesi: null
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
  },
  INC_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesi++;
  },
  DEC_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesi--;
  },
  RESET_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesi = 0;
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
  incSelected({ commit }, state) {
    if (state == 1) {
      commit("INC_SELEZIONATI");
    } else {
      commit("INC_SELEZIONATISOSPESI");
    }
  },
  decSelected({ commit }, state) {
    if (state == 1) {
      commit("DEC_SELEZIONATI");
    } else {
      commit("DEC_SELEZIONATISOSPESI");
    }
  },
  resetSelected({ commit }, state) {
    if (state == 1) {
      commit("RESET_SELEZIONATI");
    } else {
      commit("RESET_SELEZIONATISOSPESI");
    }
  },
  resetAll({ commit }) {
    commit("RESET_SELEZIONATI");
    commit("RESET_SELEZIONATISOSPESI");
  }
};

const getters = {
  reports: state => {
    return state.reports;
  },
  selezionati: state => {
    return state.selezionati;
  },
  selezionatiSospesi: state => {
    return state.selezionatiSospesi;
  }
};

export const progress = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
