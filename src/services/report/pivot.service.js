import { axiosRegedit } from "@/http";

export const pivotReportService = {
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
function findByDate(user, start, end) {
  return axiosRegedit
    .get("/regedit/report-daily-pivot", {
      params: {
        user: user,
        dateModInf: start,
        dateModSup: end
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
function findByDateTotal(start, end) {
  return axiosRegedit
    .get("/regedit/report-total-daily-pivot", {
      params: {
        dateModInf: start,
        dateModSup: end
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
