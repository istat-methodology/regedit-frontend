import { dailyReportService } from "@/services";

const state = {
  reports: null
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports;
  }
};

const actions = {
  findByUser({ commit, rootGetters }) {
    let user = rootGetters["auth/user"];
    if (user) {
      return dailyReportService
        .findByUser(user.userId)
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

export const dailyreport = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
