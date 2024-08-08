import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StgDanger from "./assets/stg_danger.svg?react";
import Hand from "./assets/hand.svg?react";
import Left from "./assets/left.svg?react";
import Right from "./assets/right.svg?react";
import React from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function App() {
  const [linksExpanded, setLinksExpanded] = React.useState(false);
  const ledRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    return gsap.fromTo(
      ledRef.current,
      { translateX: 0 },
      { translateX: "-100%", repeat: -1, duration: 5, ease: "linear" }
    );
  });

  return (
    <div
      css={css`
        background-color: #fff;
        height: 100%;
        position: relative;
        overflow: hidden;
        border: 20px solid #5c75ec;
      `}
    >
      <section
        css={css`
          position: absolute;
          top: 40px;
        `}
      >
        {/* <img
          src={stgDanger}
          alt="stg_danger"
          css={css`
            width: 100%;
          `}
        /> */}
        <StgDanger
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
        <div
          css={css`
            position: absolute;
            top: 23px;
            left: 50%;
            transform: translateX(-50%);
            font-family: "Libre Barcode 128 Text";
            font-size: 128px;
            color: #5c75ec;
          `}
        >
          play.toiletmc.net
        </div>
        <div
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            font-family: "Unifont";
            color: #5c75ec;
            font-size: 128px;
          `}
        >
          厕所
          <br />
          总部
        </div>
      </section>
      <section
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 100px;
          gap: 100px;
        `}
      >
        <Hand
          onClick={() => setLinksExpanded((prev) => !prev)}
          css={css`
            position: absolute;
            left: 70px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            transition: 0.3s;
            cursor: pointer;
          `}
        />
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 100px;
            opacity: 0;
            transform: translateX(-200px);
            transition: 0.3s;

            &.links-expanded {
              opacity: 1;
              transform: translateX(0);
            }
          `}
          className={clsx({
            "links-expanded": linksExpanded,
          })}
        >
          <BottomLink href="https://wiki.toiletmc.net">Wiki</BottomLink>
          <BottomLink href="#">About</BottomLink>
        </div>
      </section>
      <section
        css={css`
          position: absolute;
          bottom: 33px;
          font-weight: 800;
          color: #fff;
          font-size: 3em;
          width: 100%;
          background-color: #5c75ec;
        `}
      >
        <div
          css={css`
            white-space: nowrap;
          `}
          ref={ledRef}
        >
          <LEDText>这是一个非常无聊但因为有趣的人而有趣起来的服务器</LEDText>
          <LEDText>这是一个非常无聊但因为有趣的人而有趣起来的服务器</LEDText>
        </div>
      </section>
      <section
        css={css`
          position: absolute;
          bottom: 151px;
          right: 45px;
          display: flex;
          gap: 2rem;
        `}
      >
        <CornerButton
          css={css`
            padding-right: 10px;
          `}
        >
          <Left />
        </CornerButton>
        <CornerButton
          css={css`
            padding-left: 10px;
          `}
        >
          <Right />
        </CornerButton>
      </section>
    </div>
  );
}

const BottomLink = styled.a`
  text-decoration: none;
  font-weight: 200;
  font-family: sans-serif;
  color: #5c75ec;
  vertical-align: baseline;
  font-size: 150px;
  letter-spacing: -0.08em;
  font-family: "JetBrains Mono Variable";

  &:hover {
    text-decoration: underline 1rem;
    text-underline-offset: 1.5rem;
  }
`;

const LEDText = styled.span`
  width: 100%;
  display: inline-block;
`;

const CornerButton = styled.button`
  width: 70px;
  height: 70px;
  background: #5c75ec;
  border-radius: 500%;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
