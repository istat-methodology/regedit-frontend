import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ExportCSVService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  getCSV() {
    {
      return axiosRegedit
        .get(this.endpoint + "/toponimi/export-toponimi")
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

export const exportCSVService = new ExportCSVService("/regedit");
