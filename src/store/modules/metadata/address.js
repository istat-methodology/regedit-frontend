import { addressService } from "@/services";
// import { getNext } from "@/common";

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
  findByUserAndState({ commit, rootGetters }, stateId) {
    //clear addresses
    commit("SET_ADDRESSES", null);
    //get user from store
    let user = rootGetters["auth/user"];

    return addressService
      .findByUserAndState(user.userId, stateId)
      .then(data => {
        //console.log(data);
        commit("SET_ADDRESSES", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findNextAddress({ commit, rootGetters }, stateId) {
    //get user from store
    let user = rootGetters["auth/user"];

    return addressService
      .findNextAddress(user.userId, stateId)
      .then(data => {
        //console.log(data);
        commit("SET_ADDRESSES", data);
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
  update({ commit }, formData) {
    return addressService
      .update(formData)
      .then(data => {
        /* let nextAddress = getNext(state.addresses, data);
        if (nextAddress) {
          commit("SET_ADDRESS", nextAddress);
        } else {
          //do something
        } */
        dispatch("message/success", "Indirizzo aggiornato con successo!", {
          root: true
        });
        commit("SET_ADDRESS", data);
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
