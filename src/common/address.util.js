import store from "@/store";

export function getUserId() {
  let id = -1;
  if (store.getters["auth/isSupervisor"])
    id = store.getters["address/assignedId"];
  else {
    let user = store.getters["auth/user"];
    if (user) id = user.userId;
  }
  return id;
}
