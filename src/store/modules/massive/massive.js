import { massiveService } from "@/services";

const actions = {
  update({ dispatch }, payload) {
    return massiveService
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

export const massive = {
  namespaced: true,
  actions
};
