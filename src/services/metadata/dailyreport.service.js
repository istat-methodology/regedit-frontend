import AbstractService from "@/services/abstract.service";
import { axiosRegedit } from "@/http";

class dailyReportService extends AbstractService {
  findByUser(user) {
    return axiosRegedit
      .get(this.endpoint + "/users/" + user)
      .then(res => {
        var data = res.data ? res.data : [];
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
  findAll() {
    return axiosRegedit
      .get(this.endpoint)
      .then(res => {
        var data = res.data ? res.data : [];
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
  findByUserAndState(user, state) {
    return axiosRegedit
      .get(this.endpoint + "/users/" + user + "/states/" + state)
      .then(res => {
        var data = res.data ? res.data : [];
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}

export const dailyreportService = new dailyReportService(
  "/regedit/report-daily"
);
