import { businessServiceService } from "@/services";

const state = {
  businessServices: [],
  businessService: {}
};

const mutations = {
  SET_BUSINESS_SERVICES(state, businessServices) {
    state.businessServices = businessServices;
  },
  SET_BUSINESS_SERVICE(state, businessService) {
    state.businessService = businessService;
  }
};

const actions = {
  findAll({ commit }) {
    return businessServiceService
      .findAll()
      .then(data => {
        commit("SET_BUSINESS_SERVICES", data);
        commit("SET_BUSINESS_SERVICE", null); //clear businessService
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return businessServiceService
      .findById(id)
      .then(data => {
        //console.log(data);
        commit("SET_BUSINESS_SERVICE", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    businessServiceService
      .save(formData)
      .then(data => {
        //console.log(data);
        commit("SET_BUSINESS_SERVICE", data);
        dispatch("message/success", "Business service saved!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit, dispatch }, formData) {
    businessServiceService
      .update(formData)
      .then(data => {
        //console.log(data);
        commit("SET_BUSINESS_SERVICE", data);
        dispatch("message/success", "Business service updated!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    businessServiceService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Business service deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  businessServices: state => {
    return state.businessServices;
  },
  businessService: state => {
    return state.businessService;
  }
};

export const businessService = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
