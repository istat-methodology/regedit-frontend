import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
class MassiveTopService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  update(payload) {
    //console.log(config);
    console.log(payload);
    return axiosRegedit
      .put(this.endpoint, {
        toponimoList: payload.toponimoList,
        dugVal: payload.dug,
        dufVal: payload.duf,
        localitaVal: payload.localita,
        cdpstr: payload.codStrada,
        /*  state: 3, */
        //idFonte: payload.codStrada == "" ? null : 1,
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

export const massiveTopService = new MassiveTopService(
  "/regedit/toponimi-list"
);
