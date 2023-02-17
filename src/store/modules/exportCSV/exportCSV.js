import { exportCSVService } from "@/services";

const state = {
  exportCSV: null
};

const mutations = {
  SET_EXPORTCSV(state, csv) {
    state.exportCSV = csv;
  }
};

const actions = {
  //async exportCSV({ commit }) {
  exportCSV({ commit }) {
    //get user from store

    return exportCSVService //await exportCSVService
      .getCSV()
      .then(data => {
        commit("SET_EXPORTCSV", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  exportCSV: state => {
    return state.exportCSV;
  }
};

export const csv = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
