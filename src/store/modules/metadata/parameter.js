import { parameterService } from "@/services";

const state = {
  parameters: [],
  parameter: {}
};

const mutations = {
  SET_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },
  SET_PARAMETER(state, parameter) {
    state.parameter = parameter;
  }
};

const actions = {
  findAll({ commit }) {
    parameterService.findAll().then(
      data => {
        commit("SET_PARAMETERS", data);
        commit("SET_PARAMETER", null); //clear process step
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    parameterService.findById(id).then(
      data => {
        commit("SET_PARAMETER", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    parameterService.save(formData).then(
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
    parameterService.delete(id).then(
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
    parameterService.update(formData).then(
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
  parameters: state => {
    return state.parameters;
  },
  parameter: state => {
    return state.parameter;
  }
};

export const parameter = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
