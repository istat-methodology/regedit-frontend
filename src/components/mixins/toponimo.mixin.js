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
      scriptFields: [
        {
          key: "idProcesso",
          label: "Id Processo",
          _style: "min-width:5%;",
          filter: false
        },
        { key: "proCom", label: "Procom", filter: false },
        //{ key: "indirizzo", label: "Indirizzo", filter: false },
        {
          key: "comune",
          label: "Comune",
          _style: "width:5%;",
          filter: false
        },
        //{ key: "cdpsdr", label: "Cdpsdr", filter: false },
        {
          key: "localitax",
          label: "Localitax",
          _style: "min-width:20%;",
          filter: false
        },
        {
          key: "dugx",
          label: "Dugx",
          _style: "min-width:20%;",
          filter: false
        },
        {
          key: "dufx",
          label: "Dufx",
          _style: "width:4%;",
          filter: false
        },
        /*  {
          key: "cdpstr",
          label: "Cdpstr",
          _style: "min-width:5%;",
          filter: false
        }, */
        {
          key: "localitay",
          label: "Localitay",
          _style: "width:5%",
          sorter: false,
          filter: false
        },
        {
          key: "dugy",
          label: "Dugy",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dufy",
          label: "Dufy",
          _style: "width:5%;",
          filter: false
        },
        {
          key: "dnc",
          label: "Dnc",
          _style: "width:5%",
          sorter: false,
          filter: false
        },
        {
          key: "dug",
          label: "Dug",
          _style: "width:4%;",
          filter: false
        },
        {
          key: "md",
          label: "Md",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "w",
          label: "W",
          _style: "width:5%;",
          filter: false
        }
        /* {
          key: "vmax",
          label: "Vmax",
          _style: "width:5%",
          sorter: false,
          filter: false
        },
        {
          key: "falsipositivi",
          label: "Falsipositivi",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "falsinegativi",
          label: "Falsinegativi",
          _style: "width:5%;",
          filter: false
        },
        {
          key: "denomProv",
          label: "DenomProv",
          _style: "width:5%",
          sorter: false,
          filter: false
        },
        {
          key: "codProv",
          label: "CodProv",
          _style: "width:5%;",
          filter: false
        },
        {
          key: "ordine",
          label: "Ordine",
          _style: "width:5%",
          sorter: false,
          filter: false
        } */
      ],
      elencoScriptFields: [
        {
          key: "idProcesso",
          label: "Id Processo",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "codiceArchivio",
          label: "Archivio",
          _style: "min-width:5%;",
          filter: false
        },
        //{ key: "indirizzo", label: "Indirizzo", filter: false },
        {
          key: "codiciProvincia",
          label: "Province",
          _style: "width:15%;",
          filter: false
        },
        //{ key: "cdpsdr", label: "Cdpsdr", filter: false },
        {
          key: "soglia",
          label: "Soglia",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dataInizio",
          label: "Inizio",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "dataFine",
          label: "Termine",
          _style: "min-width:5%;",
          filter: false
        },
        {
          key: "stato",
          label: "Stato",
          _style: "width:5%",
          sorter: false,
          filter: false
        }
        /*  {
          key: "esito",
          label: "Esito",
          _style: "width:5%",
          sorter: false,
          filter: false
        } */
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
   /*  getStatoColorScript(stato) {
      switch (stato) {
        case -1:
          return "warning";
        case 0:
          return "danger";
        case 1:
          return "success";
        default:
          return "primary";
      }
    },
    getStatoStringScript(stato, indice) {
      switch (stato) {
        case -1:
          return "Errore script";
        case 0:
          if (indice > 1) {
            return "Esecuzione abortita";
          }
          return "Esecuzione in corso..";

        case 1:
          return "Completato";
        default:
          return "";
      }
    }, */
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
