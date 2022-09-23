export default {
  data() {
    return {
      addressType: {
        Original: "ORIGINAL",
        Revised: "REVISED",
        Suggested: "SUGGESTED"
      },
      addressState: {
        TobeRevised: 1,
        Revised: 2,
        Skip: 3,
        Validated: 4
      },
      fields: [
        {
          key: "progressivoIndirizzo",
          label: "Progressivo",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "indirizzoOriginale",
          label: "Indirizzo",
          _style: "min-width:25%;",
          filter: false
        },
        { key: "proCom", label: "Procom", filter: false },
        { key: "denominazioneComune", label: "Comune", filter: false },
        {
          key: "validazione",
          label: "Validazione",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "dataMod",
          label: "Ultima modifica",
          _style: "width:20%;",
          filter: false
        },
        {
          key: "action",
          label: "",
          _style: "width:10%",
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
        {
          key: "progressivoIndirizzo",
          label: "Progressivo",
          _style: "width:10%;"
        },
        {
          key: "indirizzoOriginale",
          label: "Indirizzo",
          _style: "min-width:25%;"
        },
        { key: "proCom", label: "Procom" },
        { key: "denominazioneComune", label: "Comune" },
        {
          key: "dugVal",
          label: "dug",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "dufVal",
          label: "duf",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "localitaVal",
          label: "località",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "cdpstrEgon",
          label: "codice strada",
          _style: "width:10%;",
          filter: false
        },
        {
          key: "note",
          label: "note",
          _style: "width:20%;",
          filter: false
        },
        {
          key: "dataMod",
          label: "Ultima modifica",
          _style: "width:10%;",
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
    printAddress(address, type) {
      if (address === null) return "";
      switch (type) {
        case this.addressType.Original:
          return (address.indirizzoOriginale
            ? address.indirizzoOriginale
            : ""
          ).concat(
            address.localitaOriginale ? ", " + address.localitaOriginale : ""
          );
        case this.addressType.Suggested:
          return (address.dugNorm ? address.dugNorm : "")
            .concat(address.dufNorm ? " " + address.dufNorm : "")
            .concat(address.civicoNorm ? " " + address.civicoNorm : "")
            .concat(address.esponenteNorm ? " " + address.esponenteNorm : "")
            .concat(address.localitaNorm ? ", " + address.localitaNorm : "");
        case this.addressType.Revised:
          return (address.dugVal ? address.dugVal : "")
            .concat(address.dufVal ? " " + address.dufVal : "")
            .concat(address.civicoVal ? " " + address.civicoVal : "")
            .concat(address.kmVal ? " " + address.kmVal : "")
            .concat(address.esponenteVal ? " " + address.esponenteVal : "")
            .concat(address.localitaVal ? ", " + address.localitaVal : "");
        default:
          return "";
      }
    },
    getAddressMessage(address, state) {
      switch (state) {
        case this.addressState.Validated:
          return "Indirizzo " + address.indirizzoOriginale + " validato!";
        case this.addressState.Revised:
          return (
            "Indirizzo " +
            address.indirizzoOriginale +
            " revisionato con successo!"
          );
        case this.addressState.Skip:
          return "Indirizzo " + address.indirizzoOriginale + " sospeso!";
        default:
          return "";
      }
    },
    getAddressMessageType(state) {
      switch (state) {
        case this.addressState.Validated:
          return "success";
        case this.addressState.Revised:
          return "success";
        case this.addressState.Skip:
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
    isAddressValidated(address) {
      return address.validazione === "SI" ? true : false;
    },
    getSelected(addresses) {
      var selezionati = [];
      addresses.forEach(element => {
        if (element.selected) {
          selezionati.push(element.progressivoIndirizzo);
        }
      });
      return selezionati;
    },
    getCompletedMessage(comune, address) {
      return "Complimenti hai completato "
        .concat(comune ? comune.denominazioneComune + ", " : " ")
        .concat(address ? address : "");
    }
  }
};
