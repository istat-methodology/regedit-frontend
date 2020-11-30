import { Address } from "@/common";

function getNext(objArray, obj) {
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

function printAddress(address, type) {
  let addr = "";
  switch (type) {
    case Address.Original:
      break;
    case Address.Suggested:
      break;
  }
  return addr;
}

export const Util = {
  getNext,
  printAddress
};
