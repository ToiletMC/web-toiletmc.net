import { atom } from "recoil";

export const isMobile = navigator.userAgent.match(
  /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
);

export const pageAtom = atom({
  key: "pageState",
  default: -1,
});
export const prevNextAtom = atom<[() => void, () => void] | []>({
  key: "prevNextState",
  default: [],
});
export const hookAtom = atom({
  key: "hookState",
  default: "",
});
