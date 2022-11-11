import { provinceService } from "@/services";
import { getUserId } from "@/common";

const state = {
  province: null
};

const mutations = {
  SET_PROVINCE(state, province) {
    state.province = province;
  }
};

const actions = {
  findProvinceByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return provinceService
        .findProvinceByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_PROVINCE", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findTopProvinceByUser({ commit }) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return provinceService
        .findTopProvinceByUser(userId)
        .then(data => {
          //console.log(data);
          commit("SET_PROVINCE", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findProvinceByUserAndState({ commit }, state) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return provinceService
        .findProvinceByUserAndState(userId, state)
        .then(data => {
          //console.log(data);
          commit("SET_PROVINCE", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  findTopProvinceByUserAndState({ commit }, state) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return provinceService
        .findTopProvinceByUserAndState(userId, state)
        .then(data => {
          //console.log(data);
          commit("SET_PROVINCE", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  province: state => {
    return state.province;
  }
};

export const elencoProvince = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
