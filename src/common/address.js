export const Address = {
  Original: "ORIGINAL",
  Revised: "REVISED",
  Suggested: "SUGGESTED"
};

export const State = {
  TobeRevised: 1,
  Revised: 2,
  Skip: 3,
  Validated: 4
};

export function getMessage(address, state) {
  switch (state) {
    case State.Validated:
      return "Indirizzo " + address.indirizzoOriginale + " Validated!";
    case State.Revised:
      return (
        "Indirizzo " + address.indirizzoOriginale + " Revised con successo!"
      );
    case State.Skip:
      return "Indirizzo " + address.indirizzoOriginale + " sospeso!";
    default:
      return "";
  }
}

export function getMessageType(state) {
  switch (state) {
    case State.Validated:
      return "success";
    case State.Revised:
      return "success";
    case State.Skip:
      return "error";
    default:
      return "error";
  }
}
