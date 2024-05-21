import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ElencoScriptService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findElencoByUser() {
    {
      return axiosRegedit
        .get(this.endpoint + "/log-linkage-probabilistico")
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

export const elencoScriptService = new ElencoScriptService("/regedit");
