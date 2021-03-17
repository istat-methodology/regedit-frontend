import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
class MassiveService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  update(payload) {
    //console.log(config);
    console.log(payload);
    return axiosRegedit
      .put(this.endpoint, {
        addressList: payload.addrList,
        dugVal: payload.dug,
        dufVal: payload.duf,
        /*  state: 3, */
        note: payload.note
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
