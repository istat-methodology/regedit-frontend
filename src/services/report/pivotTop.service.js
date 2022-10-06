import { axiosRegedit } from "@/http";

export const pivotReportTopService = {
  findAll,
  findByUser,
  findByDate,
  findByDateTotal
};

function findAll() {
  return axiosRegedit
    .get("/regedit/report-pivot")
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
    .get("/regedit/report-pivot", {
      params: {
        user: user
      }
    })
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
function findByDate(user, startday, endday) {
  return axiosRegedit
    .get("/regedit/report-daily-pivot", {
      params: {
        user: user,
        dateModInf: startday,
        dateModSup: endday
      }
    })
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
function findByDateTotal(startday, endday) {
  return axiosRegedit
    .get("/regedit/report-total-daily-pivot", {
      params: {
        dateModInf: startday,
        dateModSup: endday
      }
    })
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
