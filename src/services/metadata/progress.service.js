import AbstractService from "@/services/abstract.service";
import { axiosRegedit } from "@/http";

class ProgressService extends AbstractService {
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
}

export const progressService = new ProgressService("/regedit/report");
