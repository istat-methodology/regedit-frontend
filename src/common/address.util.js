import store from "@/store";

export function getUserId() {
  let id = -1;

  if (store.getters["auth/isSupervisor"]) {
    if (store.getters["customswitch/isToponimi"]) {
      id = store.getters["toponimo/assignedTopId"];
    } else {
      id = store.getters["address/assignedId"];
    }
  } else {
    let user = store.getters["auth/loggedUser"];
    if (user) id = user.userId;
  }

  /* if (
    store.getters["auth/isSupervisor"] &&
    store.getters["customswitch/toponimi"]
  ) {
    id = store.getters["address/assignedId"];
  } else {
    let user = store.getters["auth/loggedUser"];
    if (user) id = user.userId;
  }
  if (
    store.getters["auth/isSupervisor"] &&
    !store.getters["customswitch/toponimi"]
  ) {
    id = store.getters["toponimo/assignedTopId"];
  } else {
    let user = store.getters["auth/loggedUser"];
    if (user) id = user.userId;
  } */
  return id;
}
