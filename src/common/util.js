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
      return address.indirizzoOriginale
        .concat(address.localitaNorm ? ", " + address.localitaNorm : "")
        .concat(
          address.denominazioneComune ? ", " + address.denominazioneComune : ""
        );
    case Address.Suggested:
      return address.dugNorm
        .concat(address.dufNorm ? " " + address.dufNorm : "")
        .concat(address.civicoNorm ? " " + address.civicoNorm : "")
        .concat(address.esponenteNorm ? " " + address.esponenteNorm : "")
        .concat(address.localitaNorm ? ", " + address.localitaNorm : "");
    case Address.Revised:
      return address.dugVal
        .concat(address.dufVal ? " " + address.dufVal : "")
        .concat(address.civicoVal ? " " + address.civicoVal : "")
        .concat(address.esponenteVal ? " " + address.esponenteVal : "")
        .concat(address.localitaVal ? ", " + address.localitaVal : "");
    default:
      return "";
  }
}

export function getValidatoColor(validato) {
  switch (validato) {
    case 1:
      return "primary";
    case 2:
      return "success";
    case 3:
      return "danger";
  }
}

export function getValidatoString(validato) {
  switch (validato) {
    case "SI":
      return "VALIDATO";
    case "NO":
      return "REVISIONATO";
    default:
      return "DA LAVORARE";
  }
}
