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
    }
  }
};
