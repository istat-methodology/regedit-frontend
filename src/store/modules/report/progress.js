import { progressReportService } from "@/services";
import { getUserId } from "@/common";

const state = {
  reports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports;
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
