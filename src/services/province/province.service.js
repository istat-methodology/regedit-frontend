import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ProvinceService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findProvinceByUser(user) {
    {
      return axiosRegedit
        .get(this.endpoint + "/addresses-province", {
          params: {
            user: user
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
  findTopProvinceByUser(user) {
    {
      return axiosRegedit
        .get(this.endpoint + "/toponimi-province", {
          params: {
            user: user
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
  findProvinceByUserAndState(user, state) {
    {
      return axiosRegedit
        .get(this.endpoint + "/addresses-province", {
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
  findTopProvinceByUserAndState(user, state) {
    {
      return axiosRegedit
        .get(this.endpoint + "/toponimi-province", {
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

export const provinceService = new ProvinceService("/regedit");
