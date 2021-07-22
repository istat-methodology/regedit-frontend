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
  findAllUsers({ commit }) {
    userService.findAllUsers().then(
      data => {
        commit("SET_USERS", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  findByRole({ commit }, role) {
    userService.findByRole(role).then(
      data => {
        commit("SET_USERS", data);
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
        router.push("/settings/users");
      },
      error => {
        console.log(error);
      }
    );
  },
  changePassword({ dispatch }, formData) {
    userService.changePass(formData).then(
      data => {
        console.log(data);
        const codice = data.substr(data, 2);
        switch (codice) {
          case "01":
            dispatch("message/success", data.substring(3, data.length), {
              root: true
            });
            break;
          case "02":
            dispatch("message/warning", data.substring(3, data.length), {
              root: true
            });
            break;
          case "03":
            dispatch("message/error", data.substring(3, data.length), {
              root: true
            });
            break;
          default:
            dispatch("message/error", data, {
              root: true
            });
            break;
        }

        router.push("catalogue");
      },
      error => {
        console.log(error);
      }
    );
  },
  resetPassword({ dispatch }, formData) {
    userService.resetPass(formData).then(
      data => {
        console.log(data);
        const codice = data.substr(data, 2);
        switch (codice) {
          case "01":
            dispatch("message/success", data.substring(3, data.length), {
              root: true
            });
            break;
          case "02":
            dispatch("message/warning", data.substring(3, data.length), {
              root: true
            });
            break;
          case "03":
            dispatch("message/error", data.substring(3, data.length), {
              root: true
            });
            break;
          default:
            dispatch("message/error", data, {
              root: true
            });
            break;
        }

        router.push("/settings/users");
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
