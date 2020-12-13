import jwt from "jsonwebtoken";
import { authService } from "@/services";
import { Role } from "@/common";
import { AuthStatus } from "@/common";

const state = {
  token: localStorage.getItem("token") || null,
  user: null,
  status: null,
  errorMsg: null,
  role: localStorage.getItem("role") || ""
};

const mutations = {
  AUTH_USER(state, { token, user }) {
    state.token = token;
    state.user = user;
    state.role = user.role;

    //store auth data in browser storage
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
  },
  CLEAR_AUTH_DATA(state) {
    state.token = null;
    state.user = null;
    state.role = "";

    //remove auth data from browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_ERROR_MSG(state, errorMsg) {
    state.errorMsg = errorMsg;
  }
};

const actions = {
  login({ commit }, authData) {
    return authService
      .login(authData)
      .then(data => {
        //decode JWT token
        var decoded = jwt.decode(data.token, { complete: true });
        console.log(decoded);
        const user = decoded.payload;
        console.log(user);

        commit("AUTH_USER", {
          token: data.token,
          user: user
        });
        commit("SET_STATUS", AuthStatus.Logged);

        return { staus: AuthStatus.Logged };
      })
      .catch(error => {
        console.log(error);
        commit("SET_STATUS", AuthStatus.InvalidCredentials);
        commit("SET_ERROR_MSG", "Incorrect username or password!");

        return { staus: AuthStatus.InvalidCredentials };
      });
  },
  reloadCredentials({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      //decode JWT token
      var decoded = jwt.decode(token, { complete: true });
      const user = decoded.payload;
      console.log(user);

      commit("AUTH_USER", {
        token,
        user
      });

      commit("SET_STATUS", AuthStatus.Logged);
    }
  },
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
  }
};
const getters = {
  user: state => {
    return state.user;
  },
  isAuthenticated: state => {
    return state.token !== null;
  },
  token: state => {
    return state.token;
  },
  status: state => {
    return state.status;
  },
  errorMsg: state => {
    return state.errorMsg;
  },
  role: state => {
    return state.role;
  },
  isAdmin: state => {
    return state.role == Role.Admin;
  },
  isUser: state => {
    return state.role == Role.USer;
  }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
