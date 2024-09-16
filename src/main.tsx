import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/libre-barcode-128-text";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CSSPlugin from "gsap/CSSPlugin";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import "han-css/dist/han.min.css";

gsap.registerPlugin(useGSAP, CSSPlugin);

const rootEl = document.getElementById("root")!;

// const isDesktop = innerWidth / innerHeight > 1512 / 982;
// if (isDesktop) {
//   // desktop
//   rootEl.attributeStyleMap.set("aspect-ratio", "1512/982");
//   rootEl.style.height = "100vh";
// } else {
//   // mobile
//   rootEl.attributeStyleMap.set("aspect-ratio", "393/852");
//   rootEl.style.width = "100vw";
// }

createRoot(rootEl).render(
  <StrictMode>
    <RecoilRoot>
      {/* {isDesktop ? <App /> : <AppMobile />} */}
      <App />
      <Toaster />
    </RecoilRoot>
  </StrictMode>
);
