import { rServerService } from "@/services";
//import { getUserId } from "@/common";

const state = {
  rServeResponse: null
};

const mutations = {
  SET_RESPONSE(state, risposta) {
    state.rServeResponse = risposta;
  }
};

const actions = {
  getResponse({ commit }) {
    //get user from store
    //let userId = getUserId();

    return rServerService
      .getRServeResponse()
      .then(data => {
        //console.log(data);
        commit("SET_RESPONSE", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  rResponse: state => {
    return state.rServeResponse;
  }
};

export const rServe = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
