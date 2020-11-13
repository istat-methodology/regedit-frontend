import { businessProcessService } from "@/services";

const state = {
  businessProcesses: null,
  businessProcess: null
};

const mutations = {
  SET_BUSINESS_PROCESSES(state, businessProcesses) {
    state.businessProcesses = businessProcesses;
  },
  SET_BUSINESS_PROCESS(state, businessProcess) {
    state.businessProcess = businessProcess;
  }
};

const actions = {
  findAll({ commit }) {
    return businessProcessService
      .findAll()
      .then(data => {
        commit("SET_BUSINESS_PROCESSES", data);
        commit("SET_BUSINESS_PROCESS", null); //clear business process
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return businessProcessService
      .findById(id)
      .then(data => {
        commit("SET_BUSINESS_PROCESS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ dispatch, commit }, formData) {
    return businessProcessService
      .save(formData)
      .then(data => {
        commit("SET_BUSINESS_PROCESS", data);
        dispatch("message/success", "Business process saved!", {
          root: true
        });
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit, dispatch }, formData) {
    return businessProcessService
      .update(formData)
      .then(data => {
        commit("SET_BUSINESS_PROCESS", data);
        dispatch("message/success", "Business process updated!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateGraph({ commit, dispatch }, formData) {
    return businessProcessService
      .update(formData)
      .then(data => {
        commit("SET_BUSINESS_PROCESS", data);
        dispatch("message/success", "Graph updated!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    return businessProcessService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Business process deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  businessProcesses: state => {
    return state.businessProcesses;
  },
  businessProcess: state => {
    return state.businessProcess;
  }
};

export const businessProcess = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
