import { Address } from "@/common";

export function getNext(objArray, obj) {
  var next = null;
  let nextIndex = -1;
  let currentIndex = objArray.findIndex(el => {
    return el.id === obj.id;
  });
  console.log("Current index: " + currentIndex);

  if (currentIndex > -1) {
    nextIndex = currentIndex < objArray.length - 1 ? currentIndex + 1 : 0;
    next = objArray[nextIndex];
  }
  console.log("Next index: " + nextIndex);

  return next;
}

export function printAddress(address, type) {
  if (address === null) return "";
  switch (type) {
    case Address.Original:
      return (address.indirizzoOriginale ? address.localitaOriginale : "")
        .concat(
          address.localitaOriginale ? ", " + address.localitaOriginale : ""
        )
        .concat(
          address.denominazioneComune ? ", " + address.denominazioneComune : ""
        );
    case Address.Suggested:
      return (address.dugNorm ? address.dugNorm : "")
        .concat(address.dufNorm ? " " + address.dufNorm : "")
        .concat(address.civicoNorm ? " " + address.civicoNorm : "")
        .concat(address.esponenteNorm ? " " + address.esponenteNorm : "")
        .concat(address.localitaNorm ? ", " + address.localitaNorm : "");
    case Address.Revised:
      return (address.dugVal ? address.dugVal : "")
        .concat(address.dufVal ? " " + address.dufVal : "")
        .concat(address.civicoVal ? " " + address.civicoVal : "")
        .concat(address.kmVal ? " " + address.kmVal : "")
        .concat(address.esponenteVal ? " " + address.esponenteVal : "")
        .concat(address.localitaVal ? ", " + address.localitaVal : "");
    default:
      return "";
  }
}

export function getStatoColor(stato, validazione) {
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
}

export function getStatoString(stato, validazione) {
  switch (stato) {
    case 1:
      return "DA LAVORARE";
    case 2:
      if (validazione == "SI") {
        return "VALIDATO";
      }
      if (validazione == "NO") {
        return "REVISIONATO";
      }
      return "LAVORATO";
    case 3:
      return "SOSPESO";
    default:
      return "";
  }
}
