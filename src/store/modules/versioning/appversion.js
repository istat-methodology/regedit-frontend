const state = {
  packageVersion: "0.2"
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
