import { Context, createBreadcrumbs } from "@/common";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  context: "",
  isLoading: false,
  isHome: false,
  isAddressToRevise: false,
  isAddressRevised: false,
  isAddressSkip: false,
  breadcrumbs: [
    {
      path: "metadata",
      to: "/metadata"
    }
  ]
};

const mutations = {
  TOGGLE_SIDEBAR_DESKTOP(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  TOGGLE_SIDEBAR_MOBILE(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_CONTEXT(state, context) {
    state.context = context;
    switch (context) {
      case Context.Home:
        state.isHome = true;
        break;
      case Context.AddressToRevise:
        state.isAddressToRevise = true;
        break;
      case Context.AddressRevised:
        state.isAddressRevised = true;
        break;
      case Context.AddressSkip:
        state.isAddressSkip = true;
        break;
      default:
        break;
    }
  },
  CLEAR_CONTEXT(state) {
    state.context = "";
    state.isHome = false;
    state.isAddressToRevise = false;
    state.isAddressRevised = false;
    state.isAddressSkip = false;
  },
  SET_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
  set(state, [variable, value]) {
    state[variable] = value;
  }
};

const actions = {
  toggleSidebarDesktop({ commit }) {
    commit("TOGGLE_SIDEBAR_DESKTOP");
  },
  toggleSidebarMobile({ commit }) {
    commit("TOGGLE_SIDEBAR_MOBILE");
  },
  loading({ commit }, isLoading) {
    commit("SET_LOADING", isLoading);
  },
  setContext({ commit }, context) {
    commit("CLEAR_CONTEXT");
    commit("SET_CONTEXT", context);
  },
  clearContext({ commit }) {
    commit("CLEAR_CONTEXT");
  },
  createBreadcrumbs({ commit }, route) {
    commit("SET_BREADCRUMBS", createBreadcrumbs(route));
  },
  updateBreadcrumbs({ commit }, breadcrumbs) {
    commit("SET_BREADCRUMBS", breadcrumbs);
  }
};

const getters = {
  sidebarShow: state => {
    return state.sidebarShow;
  },
  sidebarMinimize: state => {
    return state.sidebarMinimize;
  },
  context: state => {
    return state.context;
  },
  isLoading: state => {
    return state.isLoading;
  },
  isHome: state => {
    return state.isHome;
  },
  isAddressToRevise: state => {
    return state.isAddressToRevise;
  },
  isAddressRevised: state => {
    return state.isAddressRevised;
  },
  isAddressSkip: state => {
    return state.isAddressSkip;
  },
  breadcrumbs: state => {
    return state.breadcrumbs;
  }
};

export const coreui = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
