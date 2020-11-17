import { addressService } from "@/services";

const state = {
  addresses: [],
  address: {}
};

const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  }
};

const actions = {
  findAll({ commit }) {
    return addressService
      .findAll()
      .then(data => {
        commit("SET_ADDRESSES", data);
        commit("SET_ADDRESS", null); //clear businessService
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return addressService
      .findById(id)
      .then(data => {
        //console.log(data);
        commit("SET_ADDRESS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    addressService
      .save(formData)
      .then(data => {
        //console.log(data);
        commit("SET_ADDRESS", data);
        dispatch("message/success", "Address saved!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ commit, dispatch }, formData) {
    addressService
      .update(formData)
      .then(data => {
        //console.log(data);
        commit("SET_ADDRESS", data);
        dispatch("message/success", "Address updated!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    addressService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Address deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  addressServices: state => {
    return state.addresses;
  },
  addressService: state => {
    return state.address;
  }
};

export const addressServ = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
