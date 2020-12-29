import { addressService } from "@/services";

const state = {
  addresses: null,
  address: null,
  currentId: localStorage.getItem("addressId") || -1
};

const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_CURRENT_ID(state, id) {
    state.currentId = id;
    //store auth data in browser storage
    localStorage.setItem("addressId", id);
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
        commit("SET_ADDRESS", data);
        commit("SET_CURRENT_ID", data.progressivoIndirizzo);
      })
      .catch(err => {
        console.log(err);
      });
  },

  findById({ commit, getters }) {
    const id = getters["currentId"];
    if (id > 0) {
      return addressService
        .findById(id)
        .then(data => {
          //console.log(data);
          commit("SET_ADDRESS", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  update({ commit }, formData) {
    addressService
      .update(formData)
      .then(() => {
        commit("SET_ADDRESS", null);
      })
      .catch(err => {
        console.log(err);
      });
  },

  open({ commit }, formData) {
    addressService
      .update(formData)
      .then(data => {
        commit("SET_ADDRESS", data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  setCurrentId({ commit }, id) {
    commit("SET_CURRENT_ID", id);
  },

  clear({ commit }) {
    commit("SET_ADDRESSES", null);
    commit("SET_ADDRESS", null);
    commit("SET_CURRENT_ID", -1);
  }
};

const getters = {
  addresses: state => {
    return state.addresses;
  },
  address: state => {
    return state.address;
  },
  currentId: state => {
    return state.currentId;
  }
};

export const address = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
