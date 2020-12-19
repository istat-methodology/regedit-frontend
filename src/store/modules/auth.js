import { authService } from "@/services";
import { Role } from "@/common";
import { AuthStatus, getUser } from "@/common";

const state = {
  token: localStorage.getItem("token") || null,
  user: getUser(localStorage.getItem("token")) || null,
  status: null,
  errorMsg: null,
  role: localStorage.getItem("role") || ""
};

const mutations = {
  AUTH_USER(state, { token }) {
    const user = getUser(token);
    state.token = token;
    state.user = user;
    state.role = user.auth[0]; //To be fixed

    //store auth data in browser storage
    localStorage.setItem("token", token);
    localStorage.setItem("role", state.role);
  },
  CLEAR_AUTH_DATA(state) {
    state.token = null;
    state.user = null;
    state.status = null;
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
        commit("AUTH_USER", {
          token: data.token
        });
        commit("SET_STATUS", AuthStatus.Logged);

        return { status: AuthStatus.Logged };
      })
      .catch(err => {
        console.log(err);
        commit("SET_STATUS", AuthStatus.InvalidCredentials);
        commit("SET_ERROR_MSG", "Incorrect username or password!");

        return { status: AuthStatus.InvalidCredentials };
      });
  },
  reloadCredentials({ commit }) {
    if (state.token) {
      //Check if token is valid
      return authService
        .checkToken()
        .then(() => {
          commit("SET_STATUS", AuthStatus.Logged);

          return { status: AuthStatus.Logged };
        })
        .catch(err => {
          console.log(err);
          commit("CLEAR_AUTH_DATA");
          commit("SET_STATUS", AuthStatus.TokenExpired);
          commit("SET_ERROR_MSG", "Your token has expired");

          return { status: AuthStatus.TokenExpired };
        });
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
  }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
