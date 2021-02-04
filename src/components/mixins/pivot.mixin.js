export default {
  methods: {
    getLabels(reportsByDate) {
      var labels = [];
      if (reportsByDate) {
        reportsByDate.forEach(element => {
          labels.push(element.dataMod);
        });
      }
      //console.log("Totale: " + total);
      return labels;
    },
    getDatasets(reportsByDate) {
      /* var dalavorare = []; */
      var validati = [];
      var revisionati = [];
      var sospesi = [];
      reportsByDate.forEach(elementData => {
        /*  dalavorare.push(elementData.dalavorare); */
        validati.push(elementData.validati);
        revisionati.push(elementData.revisionati);
        sospesi.push(elementData.sospesi);
      });
      var datasets = [
        /* {
          label: "da lavorare",
          backgroundColor: "#c6e2ff",
          data: dalavorare
        }, */
        {
          label: "validati",
          backgroundColor: "rgba(46, 184, 92, 0.2)",
          borderColor: "rgba(46, 184, 92, 1)",
          data: validati
        },
        {
          label: "revisionati",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          data: revisionati
        },
        {
          label: "sospesi",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          data: sospesi
        }
      ];

      return datasets;
    },
    getReport(reports, user) {
      return reports.find(report => {
        return report.user == user.id;
      });
    },
    getPivot(reports, user) {
      const report = this.getReport(reports, user);
      return {
        daLavorare: report ? report.dalavorare : "-",
        validati: report ? report.validati : "-",
        revisionati: report ? report.revisionati : "-",
        sospesi: report ? report.sospesi : "-"
      };
    }
  }
};
