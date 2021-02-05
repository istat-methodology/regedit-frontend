import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ComuniService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findComuniByUser(user, state) {
    {
      return axiosRegedit
        .get(this.endpoint + "/comuni", {
          params: {
            user: user,
            stato: state
          }
        })
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

export const addressService = new ComuniService("/regedit/addresses");
