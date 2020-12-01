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
  let addr = "";
  switch (type) {
    case Address.Original:
      break;
    case Address.Suggested:
      break;
  }
  return addr;
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
