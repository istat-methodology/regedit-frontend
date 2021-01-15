import AbstractService from "@/services/abstract.service";
import { axiosRegedit } from "@/http";

class userService extends AbstractService {
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

export const userListService = new userService("/user/users");
