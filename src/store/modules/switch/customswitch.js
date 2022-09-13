const state = {
  toponimi: false
};
const mutations = {
  SET_TOPONIMI(state, val) {
    state.toponimi = val;
  }
};
const getters = {
  isToponimi: state => {
    return state.toponimi;
  }
};

const actions = {
  setToponimi({ commit }, val) {
    commit("SET_TOPONIMI", val);
    return state.toponimi;
  }
};

export const customswitch = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
