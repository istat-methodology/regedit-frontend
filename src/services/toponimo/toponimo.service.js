import { axiosRegedit } from "@/http";
import AbstractService from "@/services/abstract.service";
import { config } from "@/common";

class ToponimoService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }

  findByUserAndState(
    user,
    state,
    procom,
    toponimo,
    validazione,
    provincia,
    soglia
  ) {
    return axiosRegedit
      .get(this.endpoint, {
        params: {
          user: user,
          stato: state,
          proCom: procom,
          toponimoOriginaleContains: toponimo,
          orderBy: "sogliaW",
          sort: "DESC",
          validazione: state == 2 ? validazione : null,
          provincia: provincia,
          soglia: soglia
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

  findNextToponimo(
    user,
    state,
    procom,
    toponimo,
    validazione,
    provincia,
    soglia
  ) {
    return axiosRegedit
      .get(this.endpoint + "/first-toponimo/user/" + user + "/state/" + state, {
        params: {
          proCom: procom,
          toponimoOriginaleContains: toponimo,
          /* orderBy: "denominazioneProvincia, sogliaW",
          sort: "DESC, DESC", */
          orderBy: "sogliaW",
          sort: "DESC",
          validazione: state == 2 ? validazione : null,
          provincia: provincia,
          soglia: soglia
          /*     // eslint-disable-next-line prettier/prettier
          orderBy: state > 1 ? 'dataMod' : null,
          // eslint-disable-next-line prettier/prettier
          sort: 'desc' */
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

  update(formData) {
    return axiosRegedit
      .put(this.endpoint + "/" + formData.progressivoToponimo, formData, config)
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

export const toponimoService = new ToponimoService("/regedit/toponimi");
