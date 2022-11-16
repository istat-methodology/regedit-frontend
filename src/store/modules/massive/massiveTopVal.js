import { massiveTopValService } from "@/services";

const actions = {
  update({ dispatch }, payload) {
    return massiveTopValService
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

export const massiveTopVal = {
  namespaced: true,
  actions
};
