export default {
  data() {
    return {
      toponimoType: {
        Original: "ORIGINAL",
        Revised: "REVISED",
        Suggested: "SUGGESTED"
      },
      toponimoState: {
        TobeRevised: 1,
        Revised: 2,
        Skip: 3,
        Validated: 4
      },
      fields: [
        /*  {
          key: "progressivoToponimo",
          label: "Progressivo",
          _style: "width:5%;",
          filter: false
        }, */
        { key: "proCom", label: "Procom", filter: false },
        { key: "denominazioneProvincia", label: "Provincia", filter: false },
        { key: "denominazioneComune", label: "Comune", filter: false },
        {
          key: "toponimoOrig",
          label: "Toponimo Originale",
          _style: "min-width:20%;",
          filter: false
        },
        /* {
          key: "dugOrig",
          label: "Dug Originale",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dufOrig",
          label: "Duf Originale",
          _style: "min-width:5%;",
          filter: false
        }, */
        /*  {
          key: "dugProb",
          label: "Dug Suggerita",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dufProb",
          label: "Duf Suggerita",
          _style: "min-width:5%;",
          filter: false
        }, */
        {
          key: "toponimoProb",
          label: "Toponimo Suggerito",
          _style: "min-width:20%;",
          filter: false
        },
        {
          key: "validazione",
          label: "Valid.",
          _style: "width:4%;",
          filter: false
        },
        {
          key: "sogliaW",
          label: "Soglia",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dataMod",
          label: "Ultima modifica",
          _style: "width:5%;",
          filter: false
        },
        {
          key: "action",
          label: "",
          _style: "width:5%",
          sorter: false,
          filter: false
        }
      ],
      blockFields: [
        {
          key: "selected",
          label: "",
          _style: "width:1%;",
          sorter: false,
          filter: false
        },
        { key: "proCom", label: "Procom", filter: false },
        { key: "denominazioneProvincia", label: "Provincia", filter: false },
        { key: "denominazioneComune", label: "Comune", filter: false },
        {
          key: "localitaOrig",
          label: "Località Originale",
          _style: "min-width:20%;",
          filter: false
        },
        {
          key: "dugOrig",
          label: "Dug Originale",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dufOrig",
          label: "Duf Originale",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "localitaProb",
          label: "Località Suggerita",
          _style: "min-width:20%;",
          filter: false
        },
        {
          key: "dugProb",
          label: "Dug Suggerita",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dufProb",
          label: "Duf Suggerita",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "validazione",
          label: "Valid.",
          _style: "width:4%;",
          filter: false
        },
        {
          key: "sogliaW",
          label: "Soglia",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dataMod",
          label: "Ultima modifica",
          _style: "width:5%;",
          filter: false
        }
        /*  {
          key: "action",
          label: "",
          _style: "width:10%",
          sorter: false,
          filter: false
        } */
      ]
    };
  },
  methods: {
    printToponimo(toponimo, type) {
      if (toponimo === null) return "";
      switch (type) {
        case this.toponimoType.Original:
          return toponimo.toponimoOrig ? ", " + toponimo.toponimoOrig : "";
        case this.toponimoType.Suggested:
          return toponimo.toponimoProb ? toponimo.toponimoProb : "";

        case this.toponimoType.Revised:
          return (toponimo.dugVal ? toponimo.dugVal : "")
            .concat(toponimo.dufVal ? " " + toponimo.dufVal : "")
            .concat(toponimo.localitaVal ? ", " + toponimo.localitaVal : "");
        default:
          return "";
      }
    },
    getToponimoMessage(toponimo, state) {
      switch (state) {
        case this.toponimoState.Validated:
          return "Indirizzo " + toponimo.toponimoOrig + " validato!";
        case this.toponimoState.Revised:
          return (
            "Indirizzo " + toponimo.toponimoOrig + " revisionato con successo!"
          );
        case this.toponimoState.Skip:
          return "Indirizzo " + toponimo.toponimoOrig + " sospeso!";
        default:
          return "";
      }
    },
    getToponimoMessageType(state) {
      switch (state) {
        case this.toponimoState.Validated:
          return "success";
        case this.toponimoState.Revised:
          return "success";
        case this.toponimoState.Skip:
          return "warning";
        default:
          return "error";
      }
    },
    getStatoColor(stato, validazione) {
      switch (stato) {
        case 1:
          return "primary";
        case 2:
          if (validazione == "SI") {
            return "success";
          }
          if (validazione == "NO") {
            return "danger";
          }
          return "success";
        case 3:
          return "warning";
        default:
          return "primary";
      }
    },
    getStatoString(stato, validazione) {
      switch (stato) {
        case 1:
          return "LAVORA";
        case 2:
          if (validazione == "SI") {
            return "VALIDATO";
          }
          if (validazione == "NO") {
            return "REVISIONATO";
          }
          break;
        case 3:
          return "SOSPESO";
        default:
          return "";
      }
    },
    isToponimoValidated(toponimo) {
      return toponimo.validazione === "SI" ? true : false;
    },
    getSelected(toponimi) {
      var selezionati = [];
      toponimi.forEach(element => {
        if (element.selected) {
          selezionati.push(element.progressivoToponimo);
        }
      });
      console.log(selezionati);
      return selezionati;
    },
    getToValidate(toponimi) {
      var selezionati = [];
      toponimi.forEach(element => {
        selezionati.push(element.progressivoToponimo);
      });
      console.log(selezionati);
      return selezionati;
    },
    getCompletedMessage(comune, toponimo) {
      return "Complimenti hai completato "
        .concat(comune ? comune.denominazioneComune + ", " : " ")
        .concat(toponimo ? toponimo : "");
    }
  }
};
