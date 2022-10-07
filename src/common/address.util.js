import store from "@/store";

export function getUserId() {
  let id = -1;
  if (store.getters["auth/isSupervisor"]) {
    id = store.getters["address/assignedId"];
    if (id == -1) id = store.getters["toponimo/assignedTopId"];
  } else {
    let user = store.getters["auth/loggedUser"];
    if (user) id = user.userId;
  }
  return id;
}
