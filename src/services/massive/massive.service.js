import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class MassiveService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  update(addrList, dug, duf, note) {
    return axiosRegedit
      .put(
        this.endpoint +
          "/" +
          {
            params: {
              addressList: addrList,
              dugVal: dug,
              dufVal: duf,
              noteVal: note
            }
          }
      )
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
