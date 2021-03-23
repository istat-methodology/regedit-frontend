const state = {
  packageVersion: "1.0"
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
