import { provinceService } from "@/services";
import { getUserId } from "@/common";

const state = {
  provinceScript: null
};

const mutations = {
  SET_PROVINCESCRIPT(state, provinceScript) {
    state.provinceScript = provinceScript;
  }
};

const actions = {
  findProvinceByScript({ commit }) {
    //get user from store
    let userId = getUserId();
    let listProv = null;
    if (userId > 0) {
      return provinceService
        .findProvinceByScript()
        .then(data => {
          //console.log(data);
          listProv = data.map(items => ({
            name: items.cod_prov + "-" + items.provincia
          }));
          console.log(listProv);
          commit("SET_PROVINCESCRIPT", listProv);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

const getters = {
  provinceScript: state => {
    return state.provinceScript;
  }
};

export const elencoProvinceScript = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
