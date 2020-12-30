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
          total += element.count;
        });
      }
      return total;
    }
  }
};
