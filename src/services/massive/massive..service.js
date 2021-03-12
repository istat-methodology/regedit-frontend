import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class MassiveService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  update(massiveData) {
    return axiosRegedit
      .put(this.endpoint + "/" + massiveData)
      .then(res => {
        var data = res.data ? res.data : {};
        console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}

export const massiveService = new MassiveService("/regedit/addresses-list");
