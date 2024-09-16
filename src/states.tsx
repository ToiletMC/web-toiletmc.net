import { atom } from "recoil";

export const pageAtom = atom({
  key: "pageState",
  default: -1,
});
export const prevNextAtom = atom<[() => void, () => void] | []>({
  key: "prevNextState",
  default: [],
});
