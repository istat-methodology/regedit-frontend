import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class RoleService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  findAll() {
    return axiosRegedit
      .get(this.endpoint)
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
export const roleService = new RoleService("/users/roles");
