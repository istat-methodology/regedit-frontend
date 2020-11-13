import { processStepService } from "@/services";

const state = {
  processSteps: [],
  processStep: {}
};

const mutations = {
  SET_PROCESS_STEPS(state, processSteps) {
    state.processSteps = processSteps;
  },
  SET_PROCESS_STEP(state, processStep) {
    state.processStep = processStep;
  }
};

const actions = {
  findAll({ commit }) {
    return processStepService
      .findAll()
      .then(data => {
        commit("SET_PROCESS_STEPS", data);
        commit("SET_PROCESS_STEP", null); //clear process step
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return processStepService
      .findById(id)
      .then(data => {
        commit("SET_PROCESS_STEP", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    return processStepService
      .save(formData)
      .then(data => {
        commit("SET_PROCESS_STEP", data);
        dispatch("message/success", "Process step saved!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit, dispatch }, formData) {
    return processStepService
      .update(formData)
      .then(data => {
        commit("SET_PROCESS_STEP", data);
        dispatch("message/success", "Process step updated!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    return processStepService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Process step deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  processSteps: state => {
    return state.processSteps;
  },
  processStep: state => {
    return state.processStep;
  }
};

export const processStep = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
