import { stepInstanceService } from "@/services";

const state = {
  stepInstances: [],
  stepInstance: {}
};

const mutations = {
  SET_STEPINSTANCES(state, stepInstances) {
    state.stepInstances = stepInstances;
  },
  SET_STEPINSTANCE(state, stepInstance) {
    state.stepInstance = stepInstance;
  }
};

const actions = {
  findAll({ commit }) {
    stepInstanceService.findAll().then(
      data => {
        commit("SET_STEPINSTANCES", data);
        commit("SET_STEPINSTANCE", null); //clear process step
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    stepInstanceService.findById(id).then(
      data => {
        commit("SET_STEPINSTANCE", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    stepInstanceService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Parameter saved!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    stepInstanceService.delete(id).then(
      data => {
        console.log(data);
        dispatch("findAll");
        dispatch("message/success", "Parameter deleted!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    stepInstanceService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Parameter updated!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  stepInstances: state => {
    return state.stepInstances;
  },
  stepInstance: state => {
    return state.stepInstance;
  }
};

export const stepInstance = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
