const state = {
  code: null,
  msg: null
};

const mutations = {
  SET_CODE(state, code) {
    state.code = code;
  },
  SET_MSG(state, msg) {
    state.msg = msg;
  }
};

const actions = {
  serverError({ commit }, error) {
    commit("SET_CODE", error.status);
    commit("SET_MSG", error.message);
  }
};

const getters = {
  code: state => {
    return state.code;
  },
  msg: state => {
    return state.msg;
  }
};

export const error = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
