import { axiosRegedit } from "@/http";

export const pivotReportService = {
  findAll,
  findByUser
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
