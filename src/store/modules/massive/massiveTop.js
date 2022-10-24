import { massiveTopService } from "@/services";

const actions = {
  update({ dispatch }, payload) {
    return massiveTopService
      .update(payload)
      .then(() => {
        dispatch("message/success", "Dati aggiornati!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const massiveTop = {
  namespaced: true,
  actions
};
