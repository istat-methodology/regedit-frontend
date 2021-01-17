import { addressService } from "@/services";
import { getUserId } from "@/common";

const state = {
  addresses: null,
  address: null,
  currentId: localStorage.getItem("addressId") || -1,
  assignedId: localStorage.getItem("assignedId") || -1,
  assignedName: localStorage.getItem("assignedName") || ""
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
    //store current address in browser storage
    localStorage.setItem("addressId", id);
  },
  SET_ASSIGNED(state, user) {
    state.assignedId = user.id;
    state.assignedName = user.name;
    //store assigned user in browser storage
    localStorage.setItem("assignedId", user.id);
    localStorage.setItem("assignedName", user.name);
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

  findByUserAndState({ commit }, stateId) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return addressService
        .findByUserAndState(userId, stateId)
        .then(data => {
          //console.log(data);
          commit("SET_ADDRESSES", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  findNextAddress({ commit }, stateId) {
    //get user from store
    let userId = getUserId();
    if (userId > 0) {
      return addressService
        .findNextAddress(userId, stateId)
        .then(data => {
          //console.log(data);
          commit("SET_ADDRESS", data);
          commit("SET_CURRENT_ID", data.progressivoIndirizzo);
          return data;
        })
        .catch(err => {
          console.log(err);
        });
    }
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

  setAssigned({ commit }, user) {
    commit("SET_ASSIGNED", user);
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
  },
  assignedId: state => {
    return state.assignedId;
  },
  assignedName: state => {
    return state.assignedName;
  }
};

export const address = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
