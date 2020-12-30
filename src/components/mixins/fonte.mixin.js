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
      return this.fonteValues.find(fonte => {
        return fonte.id == id;
      });
    },
    getFonteByName(name) {
      return this.fonteValues.find(fonte => {
        return fonte.name == name;
      });
    }
  }
};
