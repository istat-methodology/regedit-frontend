import { authService } from "@/services";
import { Role } from "@/common";
import { AuthStatus, getUser, getRole } from "@/common";

const state = {
  token: localStorage.getItem("token") || null,
  user: getUser(localStorage.getItem("token")),
  role: getRole(localStorage.getItem("token")),
  status: null,
  errorMsg: null
};

const mutations = {
  AUTH_USER(state, { token }) {
    state.token = token;
    state.user = getUser(token);
    state.role = getRole(token);

    //store auth data in browser storage
    localStorage.setItem("token", token);
  },
  CLEAR_AUTH_DATA(state) {
    state.token = null;
    state.user = null;
    state.status = null;
    state.role = "";

    //remove auth data from browser storage
    localStorage.removeItem("token");
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
    commit("CLEAR_AUTH_DATA");
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
          console.log("Token expired!" + err);
          commit("CLEAR_AUTH_DATA");
          commit("SET_STATUS", AuthStatus.TokenExpired);
          commit("SET_ERROR_MSG", "La sessione di lavoro è scaduta!");

          return { status: AuthStatus.TokenExpired };
        });
    } else {
      return { status: null };
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
