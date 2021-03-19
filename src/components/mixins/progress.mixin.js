export default {
  methods: {
    getTotal(reports) {
      var total = 0;
      if (reports) {
        reports.forEach(element => {
          if (element.stato == 1 || element.stato == 2 || element.stato == 3) {
            total += element.count;
          }
        });
      }
      //console.log("Totale: " + total);
      return total;
    },

    getDaLavorare(reports) {
      var daLavorare = 0;
      if (reports) {
        reports.forEach(element => {
          if (element.stato == 1) {
            daLavorare += element.count;
          }
        });
      }
      //console.log("Da lavorare: " + daLavorare);
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
      //console.log("Validati: " + validati);
      return validati;
    },

    getRevisionati(reports) {
      var validati = 0;
      if (reports) {
        reports.forEach(element => {
          if (element.stato == 2 && element.validazione == "NO") {
            validati += element.count;
          }
        });
      }
      //console.log("Revisionati: " + validati);
      return validati;
    },

    getSospesi(reports) {
      var validati = 0;
      if (reports) {
        reports.forEach(element => {
          if (element.stato == 3) {
            validati += element.count;
          }
        });
      }
      //console.log("Sospesi: " + validati);
      return validati;
    },
    getSelezionati(selezionati) {
      var selected = 0;
      if (selezionati) {
        selected = selezionati;
      }
      return selected;
    }
  }
};
