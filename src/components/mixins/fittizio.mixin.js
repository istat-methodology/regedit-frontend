export default {
  data() {
    return {
      fittizioValues: [
        {
          id: 1,
          value: "SI"
        },
        {
          id: 2,
          value: "NO"
        }
      ]
    };
  },
  methods: {
    getFittizioById(id) {
      const fittizio = this.fittizioValues.find(fittizio => {
        return fittizio.id == id;
      });
      return fittizio ? fittizio : null;
    },
    getFittizioByValue(value) {
      const fittizio = this.fittizioValues.find(fittizio => {
        return fittizio.value == value;
      });
      return fittizio ? fittizio : null;
    }
  }
};
