import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";

class ProvinceService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  findProvinceByScript() {
    {
      return axiosRegedit
        .get(this.endpoint + "/province")
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
  executeScript(payload) {
    {
      console.log("parametri script");
      console.log(payload.province);
      console.log(payload.codArchivio);
      console.log(payload.soglia);
      return (
        axiosRegedit
          //.get(this.endpoint + "/esegui-rscript")
          .get(
            this.endpoint +
              "/esegui-rscript/" +
              payload.province +
              " /" +
              payload.codArchivio +
              "/" +
              payload.soglia
          )
          .then(data => {
            //console.log(data);
            return data;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }
  }
  findArchivioCodes() {
    {
      return (
        axiosRegedit
          //.get(this.endpoint + "/esegui-rscript")
          .get(this.endpoint + "/archivio")
          .then(res => {
            var data = res.data ? res.data : {};
            //console.log(data);
            return data;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }
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
