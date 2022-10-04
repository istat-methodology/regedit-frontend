import { progressTopReportService } from "@/services";
import { getUserId } from "@/common";

const state = {
  reportsTop: null,
  selezionatiTop: null,
  selezionatiSospesiTop: null
};

const mutations = {
  SET_REPORTS(state, reportsTop) {
    state.reportsTop = reportsTop;
  },
  INC_SELEZIONATI(state) {
    state.selezionatiTop++;
  },
  DEC_SELEZIONATI(state) {
    state.selezionatiTop--;
  },
  RESET_SELEZIONATI(state) {
    state.selezionatiTop = 0;
  },
  INC_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesiTop++;
  },
  DEC_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesiTop--;
  },
  RESET_SELEZIONATISOSPESI(state) {
    state.selezionatiSospesiTop = 0;
  }
};

const actions = {
  findByUser({ commit }) {
    let userId = getUserId();
    if (userId > 0) {
      return progressTopReportService
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
    return state.reportsTop;
  },
  selezionati: state => {
    return state.selezionatiTop;
  },
  selezionatiSospesi: state => {
    return state.selezionatiSospesiTop;
  }
};

export const progressTop = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
