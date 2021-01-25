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
      var dalavorare = [];
      var validati = [];
      var revisionati = [];
      var sospesi = [];
      reportsByDate.forEach(elementData => {
        dalavorare.push(elementData.dalavorare);
        validati.push(elementData.validati);
        revisionati.push(elementData.revisionati);
        sospesi.push(elementData.sospesi);
      });
      var datasets = [
        {
          label: "dalavorare",
          backgroundColor: "",
          data: dalavorare
        },
        {
          label: "validati",
          backgroundColor: "",
          data: validati
        },
        {
          label: "revisionati",
          backgroundColor: "",
          data: revisionati
        },
        {
          label: "sospesi",
          backgroundColor: "",
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
