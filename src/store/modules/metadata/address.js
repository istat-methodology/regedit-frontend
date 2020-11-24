import { addressService } from "@/services";

const state = {
  addresses: [],
  address: {},
  original: {},
  normalized: {},
  validated: false,
  next: -1,
  prev: -1
};

const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_ORIGINALADDRESS(state, address) {
    state.original =
      address.indirizzo_originale +
      ", " +
      address.localita_or +
      ", " +
      address.comune_or;
  },
  SET_NORMALIZEDADDRESS(state, address) {
    state.normalized =
      address.dug_su +
      " " +
      address.duf_su +
      " " +
      address.civico_su +
      " " +
      address.esponente_su +
      ", " +
      address.localita_su;
  },
  SET_VALIDATEDADDRESS(state, address) {
    if (address.validazione == "SI") {
      state.validated = true;
    }
    if (address.validazione == "NO") {
      state.validated = false;
    }
  },
  SET_NEXT_PREV(state, address) {
    var current = -1;
    for (const addr of state.addresses) {
      current++;
      if (addr.id === address.id) break;
    }
    if (current > -1) {
      state.prev = current > 0 ? current - 1 : state.addresses.length - 1;
      state.next = current < state.addresses.length - 1 ? current + 1 : 0;
    }
    console.log(
      "Current: " + current + " Prev: " + state.prev + " Next " + state.next
    );
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
        commit("SET_ORIGINALADDRESS", data);
        commit("SET_NORMALIZEDADDRESS", data);
        commit("SET_VALIDATEDADDRESS", data);
        commit("SET_NEXT_PREV", data);
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
  },
  addressOriginal: state => {
    return state.original;
  },
  addressNormalized: state => {
    return state.normalized;
  },
  addressValidated: state => {
    return state.validated;
  },
  addressNext: state => {
    return state.addresses[state.next];
  },
  addressPrev: state => {
    return state.addresses[state.prev];
  }
};

export const addressServ = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
