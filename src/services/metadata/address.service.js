import { axiosIs2 } from "@/http";
import AbstractService from "@/services/abstract.service";

class AddressService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  findByUserAndState(user, state) {
    return axiosIs2
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
