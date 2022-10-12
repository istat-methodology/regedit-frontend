import { toponimoService } from "@/services";
import { getUserId } from "@/common";

const state = {
  toponimi: null,
  toponimo: null,
  filterComune: null,
  filterToponimo: null,
  filterTopValidazione: null,
  /* filterDate: null,
  sortComune: null,
  sortAddress: null,
  sortDate: null, */
  currentTopIndex: 0,
  currentTopId: localStorage.getItem("toponimoId") || -1,
  assignedTopId: localStorage.getItem("assignedTopId") || -1,
  assignedTopName: localStorage.getItem("assignedTopName") || ""
};

const mutations = {
  SET_TOPONIMI(state, toponimi) {
    state.toponimi = toponimi;
  },
  SET_TOPONIMO(state, toponimo) {
    state.toponimo = toponimo;
  },
  SET_CURRENT_ID(state, id) {
    state.currentTopId = id;
    //store current address in browser storage
    localStorage.setItem("toponimoId", id);
  },
  SET_CURRENT_INDEX(state, id) {
    state.currentTopIndex = id;
  },
  SET_ASSIGNED(state, user) {
    state.assignedTopId = user.id;
    state.assignedTopName = user.name;
    //store assigned user in browser storage
    localStorage.setItem("assignedTopId", user.id);
    localStorage.setItem("assignedTopName", user.name);
  },
  CLEAR_ASSIGNED(state) {
    state.assignedTopId = -1;
    state.assignedTopName = "";
  },
  SET_FILTER_COMUNE(state, comune) {
    state.filterComune = comune;
  },
  SET_FILTER_TOPONIMO(state, toponimo) {
    state.filterToponimo = toponimo;
  },
  SET_FILTER_VALIDAZIONE(state, validazione) {
    state.filterTopValidazione = validazione;
  }
  /*  SET_FILTER_DATE(state, date) {
    state.filterDate = date;
  },
  SET_SORT_COMUNE(state, sort) {
    state.sortComune = sort;
  },
  SET_SORT_ADDRESS(state, sort) {
    state.sortAddress = sort;
  },
  SET_SORT_DATE(state, sort) {
    state.sortDate = sort;
  } */
};

const actions = {
  setFilterComune: ({ commit }, comune) => {
    commit("SET_FILTER_COMUNE", comune);
  },

  setFilterToponimo: ({ commit }, toponimo) => {
    commit("SET_FILTER_TOPONIMO", toponimo);
  },
  setFilterTopValidazione: ({ commit }, validazione) => {
    commit("SET_FILTER_VALIDAZIONE", validazione);
  },

  /* setFilterDate: ({ commit }, address) => {
    commit("SET_FILTER_DATE", address);
  },
   setSortComune: ({ commit }, comune) => {
    commit("SET_SORT_COMUNE", comune);
  },

  setSortAddress: ({ commit }, address) => {
    commit("SET_SORT_ADDRESS", address);
  },

  setSortDate: ({ commit }, address) => {
    commit("SET_SORT_DATE", address);
  }, */

  setSortedList({ commit }, toponimiList) {
    var newlist = toponimiList.map((items, index = 0) => ({
      ...items,
      index: index + 1,
      selected: false
    }));
    commit("SET_TOPONIMI", newlist);
  },

  findAll({ commit }) {
    return toponimoService
      .findAll()
      .then(data => {
        commit("SET_TOPONIMI", data);
        commit("SET_TOPONIMO", null); //clear businessService
      })
      .catch(err => {
        console.log(err);
      });
  },

  findByUserAndState({ commit }, stateId) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return toponimoService
        .findByUserAndState(
          userId,
          stateId,
          state.filterComune ? state.filterComune.proCom : null,
          state.filterToponimo,
          state.filterTopValidazione ? state.filterTopValidazione.value : null
        )
        .then(data => {
          //console.log(data);
          commit("SET_TOPONIMI", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findNextToponimo({ commit }) {
    //get user from store

    //console.log(data);
    var status = null;

    status = state.toponimi[state.currentTopIndex - 1];
    if (status) {
      commit("SET_TOPONIMO", state.toponimi[state.currentTopIndex - 1]);
      commit(
        "SET_CURRENT_ID",
        state.toponimi[state.currentTopIndex - 1].progressivoToponimo
      );
      return true;
    }
    return false;
  },

  findNextToponimoToWorkSoon({ commit }, stateId) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return toponimoService
        .findNextToponimo(
          userId,
          stateId,
          state.filterComune ? state.filterComune.proCom : null,
          state.filterToponimo,
          state.filterTopValidazione ? state.filterTopValidazione.value : null
        )
        .then(data => {
          //console.log(data);
          commit("SET_TOPONIMO", data);
          commit("SET_CURRENT_ID", data.progressivoToponimo);
          return data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  findById({ commit }, id) {
    return toponimoService
      .findById(id)
      .then(data => {
        //console.log(data);
        commit("SET_TOPONIMO", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  update({ commit }, formData) {
    toponimoService
      .update(formData)
      .then(() => {
        commit("SET_TOPONIMO", null);
      })
      .catch(err => {
        console.log(err);
      });
  },

  open({ commit }, formData) {
    toponimoService
      .update(formData)
      .then(data => {
        commit("SET_TOPONIMO", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  setCurrentId({ commit }, id) {
    commit("SET_CURRENT_ID", id);
  },
  updateCurrentIndex({ commit }) {
    commit("SET_CURRENT_INDEX", state.currentTopIndex + 1);
  },
  setCurrentIndex({ commit }, id) {
    commit("SET_CURRENT_INDEX", id);
  },

  setAssigned({ commit }, user) {
    commit("SET_ASSIGNED", user);
  },

  clearAssigned({ commit }) {
    commit("CLEAR_ASSIGNED");
  },

  clear({ commit }) {
    commit("SET_TOPONIMI", null);
    commit("SET_TOPONIMO", null);
  },

  clearFilters({ commit }) {
    commit("SET_FILTER_COMUNE", null);
    commit("SET_FILTER_TOPONIMO", null);
    commit("SET_FILTER_VALIDAZIONE", null);
  }
};

const getters = {
  toponimi: state => {
    return state.toponimi;
  },
  toponimo: state => {
    return state.toponimo;
  },
  currentTopId: state => {
    return state.currentTopId;
  },
  assignedTopId: state => {
    return state.assignedTopId;
  },
  assignedTopName: state => {
    return state.assignedTopName;
  },
  filterComune: state => {
    return state.filterComune;
  },
  filterToponimo: state => {
    return state.filterToponimo;
  },
  filterTopValidazione: state => {
    return state.filterTopValidazione;
  }
  /* filterDate: state => {
    return state.filterDate;
  },
  sortComune: state => {
    return state.sortComune;
  },
  sortAddress: state => {
    return state.sortAddress;
  },
  sortProcom: state => {
    return state.sortDate;
  } */
};

export const toponimo = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
