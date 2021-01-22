import { authService } from "@/services";
import { Role } from "@/common";
import { AuthStatus, getUser, getRole } from "@/common";

const state = {
  token: localStorage.getItem("token") || null,
  loggedUser: getUser(localStorage.getItem("token")),
  role: getRole(localStorage.getItem("token")),
  status: null,
  errorMsg: null
};

const mutations = {
  AUTH_USER(state, { token }) {
    state.token = token;
    state.loggedUser = getUser(token);
    state.role = getRole(token);

    //store auth data in browser storage
    localStorage.setItem("token", token);
  },
  CLEAR_AUTH_DATA(state) {
    state.token = null;
    state.loggedUser = null;
    state.status = null;
    state.role = "";

    //Clear local storage!
    localStorage.clear();
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
        commit("SET_ERROR_MSG", "Credenziali di accesso errate!");

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
        .catch(() => {
          console.log("Token expired!");
          commit("CLEAR_AUTH_DATA");
          commit("SET_STATUS", AuthStatus.TokenExpired);
          commit("SET_ERROR_MSG", "La sessione di lavoro è scaduta!");

          return { status: AuthStatus.TokenExpired };
        });
    } else {
      return { status: null };
    }
  },
  logout({ commit, dispatch }) {
    commit("CLEAR_AUTH_DATA");
    //Clear messages
    commit("SET_ERROR_MSG", null);
    dispatch("message/clear", null, {
      root: true
    });
    //Clear address store
    dispatch("address/clearAssigned", null, {
      root: true
    });
    dispatch("address/clear", null, {
      root: true
    });
  }
};
const getters = {
  loggedUser: state => {
    return state.loggedUser;
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
  isSupervisor: state => {
    return state.role == Role.Supervisor;
  },
  isReviewer: state => {
    return state.role == Role.Reviewer;
  }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
