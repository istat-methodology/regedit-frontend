import { axiosIs2 } from "@/http";
import { config } from "@/common";

export default class AbstractService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  findAll() {
    return axiosIs2
      .get(this.endpoint + "/")
      .then(res => {
        var data = res.data ? res.data : [];
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }

  findById(id) {
    return axiosIs2
      .get(this.endpoint + "/" + id)
      .then(res => {
        var data = res.data ? res.data : {};
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }

  save(formData) {
    return axiosIs2
      .post(this.endpoint, formData, config)
      .then(res => {
        var data = res.data ? res.data : {};
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }

  update(formData) {
    return (
      axiosIs2
        .put(
          "http://localhost:8081/regedit/addresses/" +
            "/" +
            formData.progressivoIndirizzo,
          formData,
          config
        )
        /* .put(
        this.endpoint + "/" + formData.progressivoIndirizzo,
        formData,
        config
      ) */
        .then(res => {
          var data = res.data ? res.data : {};
          //console.log(data);
          return data;
        })
        .catch(err => {
          throw err;
        })
    );
  }

  delete(id) {
    return axiosIs2
      .delete(this.endpoint + "/" + id)
      .then(res => {
        //console.log(res.data);
        return res.data;
      })
      .catch(err => {
        throw err;
      });
  }
}
