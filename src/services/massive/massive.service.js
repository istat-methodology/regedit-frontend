import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
class MassiveService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  update(payload) {
    return axiosRegedit
      .put(this.endpoint + "/", {
        params: {
          addressList: payload.addrList,
          dugVal: payload.dug,
          dufVal: payload.duf,
          state: 2,
          note: payload.note
        }
      })
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
