import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Intro from "./components/Intro";
import IntroLinks from "./components/IntroLinks";

export default function App() {
  return (
    <Intro>
      <IntroLinks />
    </Intro>
  );
}
