const state = {
  toponimi: localStorage.getItem("toponimi")
};
const mutations = {
  SET_TOPONIMI(state, val) {
    // eslint-disable-next-line prettier/prettier
   
    localStorage.setItem("toponimi", val);
    state.toponimi = val;
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
    console.log(state.toponimi);
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
