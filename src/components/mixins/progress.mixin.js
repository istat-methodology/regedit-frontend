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
    printTotal(progressi) {
      var total = 0;
      progressi.array.forEach(element => {
        total += element.count;
      });
      return total.toString;
    }
  }
};
