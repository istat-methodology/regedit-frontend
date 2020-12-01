import { addressService } from "@/services";
import { getNext } from "@/common";

const state = {
  addresses: null,
  address: null
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
  update({ commit, dispatch }, formData) {
    addressService
      .update(formData)
      .then(data => {
        let nextAddress = getNext(state.addresses, data);
        if (nextAddress) {
          commit("SET_ADDRESS", nextAddress);
          dispatch("message/success", "Indirizzo aggiornato con successo!", {
            root: true
          });
        } else {
          //do something
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  addresses: state => {
    return state.addresses;
  },
  address: state => {
    return state.address;
  }
};

export const address = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
