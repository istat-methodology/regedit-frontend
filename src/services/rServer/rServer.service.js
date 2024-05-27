import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class RServerService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  getRServeResponse() {
    {
      return axiosRegedit
        .get(this.endpoint + "/checkR")
        .then(res => {
          var data = res.data ? res.data : {};
          //console.log(data);
          return data;
        })
        .catch(err => {
          throw err;
        });
    }
  }
}

export const rServerService = new RServerService("/regedit");
