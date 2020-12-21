import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
import { config } from "@/common";

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
  update(formData) {
    return axiosRegedit

      .put(
        this.endpoint + "/" + formData.progressivoIndirizzo,
        formData,
        config
      )
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

export const addressService = new AddressService("/regedit/addresses");
