import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
class AddressService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  findByUserAndState(user, state) {
    return axiosRegedit
      .get(this.endpoint, {
        params: {
          user: user,
          stato: state
        }
      })
      .then(res => {
        var data = res.data ? res.data : [];
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}

export const addressService = new AddressService("/regedit/addresses");
