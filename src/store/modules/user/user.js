import router from "@/router";
import { userService } from "@/services";

const state = {
  users: [],
  user: null
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

const actions = {
  findAll({ commit }) {
    userService.findAll().then(
      data => {
        commit("SET_USERS", data);
        commit("SET_USER", null); //clear user
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    userService.findById(id).then(
      data => {
        commit("SET_USER", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    userService.save(formData).then(
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
    userService.delete(id).then(
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
    userService.update(formData).then(
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
  users: state => {
    return state.users;
  },
  user: state => {
    return state.user;
  }
};

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
