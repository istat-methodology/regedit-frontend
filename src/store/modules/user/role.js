import router from "@/router";
import { roleService } from "@/services";

const state = {
  roles: [],
  role: null
};

const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_ROLE(state, role) {
    state.role = role;
  }
};

const actions = {
  findAll({ commit }) {
    roleService.findAll().then(
      data => {
        commit("SET_ROLES", data);
        commit("SET_ROLE", null); //clear user
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    roleService.findById(id).then(
      data => {
        commit("SET_ROLE", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    roleService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "User saved!", {
          root: true
        });
        //router.push("/settings/users");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    roleService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "User deleted!", {
          root: true
        });
        router.push("/settings/users");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    roleService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "User updated!", {
          root: true
        });
        //router.push("/settings/users");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  roles: state => {
    return state.roles;
  },
  role: state => {
    return state.role;
  }
};

export const role = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
