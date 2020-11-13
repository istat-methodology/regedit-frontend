import { appRoleService } from "@/services";

const state = {
  approles: [],
  approle: {}
};

const mutations = {
  SET_APPROLES(state, approles) {
    state.approles = approles;
  },
  SET_APPROLE(state, approle) {
    state.approle = approle;
  }
};

const actions = {
  findAll({ commit }) {
    appRoleService.findAll().then(
      data => {
        commit("SET_APPROLES", data);
        commit("SET_APPROLE", null); //clear process step
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    appRoleService.findById(id).then(
      data => {
        commit("SET_APPROLE", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    appRoleService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "approle saved!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    appRoleService.delete(id).then(
      data => {
        console.log(data);
        dispatch("findAll");
        dispatch("message/success", "approle deleted!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    appRoleService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "approle updated!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  approles: state => {
    return state.approles;
  },
  approle: state => {
    return state.approle;
  }
};

export const approle = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
