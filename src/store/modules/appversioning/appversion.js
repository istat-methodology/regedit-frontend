const state = {
  packageVersion: "0.1"
};

const getters = {
  appVersion: state => {
    return state.packageVersion;
  }
};

export const version = {
  namespaced: true,
  state,
  getters
};
