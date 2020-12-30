export default {
  data() {
    return {
      fonteValues: [
        {
          id: 1,
          fonte: "Egon"
        },
        {
          id: 2,
          fonte: "Google Maps"
        },
        {
          id: 3,
          fonte: "Revisore"
        }
      ]
    };
  },
  methods: {
    getFonteById(id) {
      const fonteId = this.fonteValues.find(fonte => {
        return fonte.id == id;
      });
      return fonteId ? fonteId : null;
    },
    getFonteByName(name) {
      return this.fonteValues.find(fonte => {
        return fonte.name == name;
      });
    }
  }
};
