import { dugService } from "@/services";

const state = {
  dugs: null,
  dug: null
};

const mutations = {
  SET_DUGS(state, dugs) {
    state.dugs = dugs;
  },
  SET_DUG(state, dug) {
    state.dug = dug;
  }
};

const actions = {
  findAll({ commit }) {
    return dugService
      .findAll()
      .then(data => {
        commit("SET_DUGS", data);
        commit("SET_DUG", null); //clear dug
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    return dugService
      .save(formData)
      .then(data => {
        //console.log(data);
        commit("SET_DUG", data);
        dispatch("message/success", "Dug saved!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return dugService
      .findById(id)
      .then(data => {
        //console.log(data);
        commit("SET_DUG", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit, dispatch }, formData) {
    return dugService
      .update(formData)
      .then(data => {
        commit("SET_DUG", data);
        dispatch("message/success", "Dug saved!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    return dugService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Dug deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  dugs: state => {
    return state.dugs;
  },
  dug: state => {
    return state.dug;
  }
};

export const dug = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
