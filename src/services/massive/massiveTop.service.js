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
        localitaVal: payload.localita,
        cdpstrEgon: payload.codStrada,
        /*  state: 3, */
        idFonte: payload.codStrada == "" ? null : 1,
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

export const massiveTopService = new MassiveService("/regedit/toponimi-list");
