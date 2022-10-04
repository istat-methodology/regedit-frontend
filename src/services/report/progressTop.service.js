import { axiosRegedit } from "@/http";

export const progressTopReportService = {
  findAll,
  findByUser,
  findByUserAndState
};

function findAll() {
  return axiosRegedit
    .get("/regedit/report-top")
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function findByUser(user) {
  return axiosRegedit
    .get("/regedit/report-top/users/" + user)
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function findByUserAndState(user, state) {
  return axiosRegedit
    .get("/regedit/report-top/users/" + user + "/states/" + state)
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
