export const Context = {
  Home: "HOME",
  AddressToRevise: "ADDRESS_TO_REVISE",
  AddressRevised: "ADDRESS_REVISED",
  AddressSkip: "ADDRESS_SKIP"
};

export function getContext(context) {
  switch (parseInt(context)) {
    case 1:
      return Context.AddressToRevise;
    case 2:
      return Context.AddressRevised;
    case 3:
      return Context.AddressSkip;
    default:
      return Context.Home;
  }
}
