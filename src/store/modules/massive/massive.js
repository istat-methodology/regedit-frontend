import { massiveService } from "@/services";

const actions = {
  update({ dispatch }, addrList, dug, duf, note) {
    return massiveService
      .update(addrList, dug, duf, note)
      .then(dispatch("message/success", "Data updated!"))
      .catch(err => {
        console.log(err);
      });
  }
};

export const dug = {
  namespaced: true,
  actions
};
