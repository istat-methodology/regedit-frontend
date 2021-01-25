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
