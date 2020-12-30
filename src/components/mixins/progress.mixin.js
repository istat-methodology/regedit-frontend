export default {
  data() {
    return {
      report: {
        totali: 0,
        daLavorare: 65,
        validati: 30,
        revisionati: 5,
        sospesi: 50
      }
    };
  },
  methods: {
    getTotal(reports) {
      var total = 0;
      if (reports) {
        reports.forEach(element => {
          switch (element.stato) {
            case 1:
              total += element.count;
              break;
            case 2:
              total += element.count;
              break;
            case 3:
              total += element.count;
              break;
            default:
              break;
          }
        });
      }
      return total;
    }
  },
  getDaLavorare(reports) {
    var daLavorare = 0;
    if (reports) {
      reports.forEach(element => {
        if (element.stato == 2) {
          daLavorare += element.count;
        }
      });
    }
    return daLavorare;
  },

  getValidati(reports) {
    var validati = 0;
    if (reports) {
      reports.forEach(element => {
        if (element.stato == 2 && element.validazione == "SI") {
          validati += element.count;
        }
      });
    }
    return validati;
  }
};
