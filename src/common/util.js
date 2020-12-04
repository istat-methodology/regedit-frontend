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
      return address.indirizzo_originale
        .concat(address.localita_or ? ", " + address.localita_or : "")
        .concat(address.comune_or ? ", " + address.comune_or : "");
    case Address.Suggested:
      return address.dug_su
        .concat(address.duf_su ? " " + address.duf_su : "")
        .concat(address.civico_su ? " " + address.civico_su : "")
        .concat(address.esponente_su ? " " + address.esponente_su : "")
        .concat(address.localita_su ? ", " + address.localita_su : "");
    case Address.Revised:
      return address.dug
        .concat(address.duf ? " " + address.duf : "")
        .concat(address.civico ? " " + address.civico : "")
        .concat(address.esponente ? " " + address.esponente : "")
        .concat(address.localita ? ", " + address.localita : "");
    default:
      return "";
  }
}

export function getValidatoColor(validato) {
  switch (validato) {
    case true:
      return "success";
    case false:
      return "danger";
    default:
      return "primary";
  }
}

export function getValidatoString(validato) {
  switch (validato) {
    case true:
      return "VALIDATO";
    case false:
      return "REVISIONATO";
    default:
      return "DA LAVORARE";
  }
}
