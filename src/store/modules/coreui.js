import { Context } from "@/common";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  context: "",
  isLoading: false,
  isHome: false,
  isAddressToRevise: false,
  isAddressRevised: false,
  isAddressSkip: false,
  isDailyReport: false,
  isTotalReport: false,
  isBlock: false,
  isBlockSuspended: false
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
    state.context = parseInt(context);
    switch (parseInt(context)) {
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
      case Context.DailyReport:
        state.isDailyReport = true;
        break;
      case Context.TotalReport:
        state.isTotalReport = true;
        break;
      case Context.Block:
        state.isBlock = true;
        break;
      case Context.BlockSuspended:
        state.isBlockSuspended = true;
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
    state.isDailyReport = false;
    state.isTotalReport = false;
    state.isBlock = false;
    state.isBlockSuspended = false;
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
  isDailyReport: state => {
    return state.isDailyReport;
  },
  isTotalReport: state => {
    return state.isTotalReport;
  },
  isBlock: state => {
    return state.isBlock;
  },
  isBlockSuspended: state => {
    return state.isBlockSuspended;
  }
};

export const coreui = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
