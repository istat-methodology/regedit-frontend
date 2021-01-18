import { axiosRegedit } from "@/http";

export const dailyReportService = {
  findAll,
  findByUser,
  findByUserAndState
};

function findAll() {
  return axiosRegedit
    .get("/regedit/report-daily")
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
    .get("/regedit/report-daily/users/" + user)
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
    .get("/regedit/report-daily/users/" + user + "/states/" + state)
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
