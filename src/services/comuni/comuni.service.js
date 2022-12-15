import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ComuniService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findComuniByUser(user) {
    {
      return axiosRegedit
        .get(this.endpoint + "/addresses-comuni", {
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
  findTopComuniByUser(user) {
    {
      return axiosRegedit
        .get(this.endpoint + "/toponimi-comuni", {
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
  findComuniByUserAndState(user, state) {
    {
      return axiosRegedit
        .get(this.endpoint + "/addresses-comuni", {
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
  findTopComuniByUserAndState(user, state, provincia) {
    {
      return axiosRegedit
        .get(this.endpoint + "/toponimi-comuni", {
          params: {
            user: user,
            stato: state,
            provincia: provincia
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

export const comuniService = new ComuniService("/regedit");
