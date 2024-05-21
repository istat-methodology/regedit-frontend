import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class TabellaScriptService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findTabellaByUser() {
    {
      return axiosRegedit
        .get(this.endpoint + "/indirizzi-probabilistici")
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
  findTabellaByUserAndProc(userid, idProc) {
    {
      return axiosRegedit
        .get(this.endpoint + "/indirizzi-probabilistici/" + idProc)
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

export const tabellaScriptService = new TabellaScriptService("/regedit");
