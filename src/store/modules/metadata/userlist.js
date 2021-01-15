import { userListService } from "@/services";

const state = {
  userList: null
};

const mutations = {
  SET_USERLIST(state, users) {
    state.userList = users;
  }
};

const actions = {
  findAll({ commit }) {
    return userListService
      .findAll()
      .then(data => {
        commit("SET_USERLIST", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  users: state => {
    return state.userList;
  }
};

export const userList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
