const state = {
  isScriptRunning: false
};
const mutations = {
  SET_SCRIPTRUNNING(state, val) {
    // eslint-disable-next-line prettier/prettier
    state.isScriptRunning = val
  }
};
const getters = {
  isScriptRunning: state => {
    console.log(state.isScriptRunning);
    return state.isScriptRunning;
  }
};

const actions = {
  setScriptRunning({ commit }, val) {
    commit("SET_SCRIPTRUNNING", val);
    console.log(state.isScriptRunning);
    return state.isScriptRunning;
  }
};

export const scriptRunning = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
