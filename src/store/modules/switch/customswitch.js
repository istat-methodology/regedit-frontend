const state = {
  toponimi: localStorage.getItem("toponimi")
};
const mutations = {
  SET_TOPONIMI(state, val) {
    state.toponimi = val;
    localStorage.setItem("toponimi", val);
  }
};
const getters = {
  isToponimi: state => {
    console.log(state.toponimi);
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
