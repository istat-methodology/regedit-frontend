import { axiosRegedit } from "@/http";
import { config } from "@/common";

export default class AbstractService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  findAll() {
    return axiosRegedit
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
    return axiosRegedit
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
    return axiosRegedit
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
      axiosRegedit
        /* .put(
          "http://localhost:8081/regedit/addresses/" +
            "/" +
            formData.progressivoIndirizzo,
          formData,
          config
        ) */
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
        })
    );
  }

  delete(id) {
    return axiosRegedit
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
