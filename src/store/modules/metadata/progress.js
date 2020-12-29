import { dugService } from "@/services";

const state = {
  progresses: null
};

const mutations = {
  SET_PROGRESSES(state, progresses) {
    state.progresses = progresses;
  }
};

const actions = {
  /* 
  findAll({ commit }) {
    return dugService
      .findAll()
      .then(data => {
        commit("SET_DUGS", data);
        commit("SET_DUG", null); //clear businessService
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    dugService
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
  }, */
  findByUser({ commit }, id) {
    return dugService
      .findByUser(id)
      .then(data => {
        //console.log(data);
        commit("SET_PROGRESSES", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  /*   update({ commit, dispatch }, formData) {
    dugService
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
    dugService
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
  } */
};

const getters = {
  progresses: state => {
    return state.progresses;
  }
};

export const progress = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
