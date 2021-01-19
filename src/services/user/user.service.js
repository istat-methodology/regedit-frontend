import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class UserService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  findByRole(role) {
    return axiosRegedit
      .get(this.endpoint, {
        params: {
          role: role
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
export const userService = new UserService("/users");
