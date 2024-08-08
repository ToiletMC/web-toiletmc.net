import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StgDanger from "./assets/stg_danger.svg?react";
import Hand from "./assets/hand.svg?react";
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
            left: 322px;
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
          <BottomLink href="#">Wiki</BottomLink>
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
          <svg
            width="23"
            height="36"
            viewBox="0 0 23 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.783132 16.0881L15.9171 0.792877C16.9631 -0.264292 18.6546 -0.264292 19.6894 0.792877L22.2044 3.33458C23.2504 4.39175 23.2504 6.10122 22.2044 7.14714L11.4882 18L22.2155 28.8416C23.2615 29.8988 23.2615 31.6082 22.2155 32.6542L19.7006 35.2071C18.6546 36.2643 16.9631 36.2643 15.9282 35.2071L0.79426 19.9119C-0.262891 18.8547 -0.262891 17.1453 0.783132 16.0881Z"
              fill="white"
            />
          </svg>
        </CornerButton>
        <CornerButton
          css={css`
            padding-left: 10px;
          `}
        >
          <svg
            width="23"
            height="36"
            viewBox="0 0 23 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2165 19.9119L7.07521 35.2071C6.02868 36.2643 4.33642 36.2643 3.30102 35.2071L0.784897 32.6654C-0.261632 31.6082 -0.261632 29.8988 0.784897 28.8529L11.5174 18.0112L0.784897 7.16963C-0.261632 6.11246 -0.261632 4.403 0.784897 3.35708L3.28989 0.792877C4.33642 -0.264292 6.02868 -0.264292 7.06407 0.792877L22.2054 16.0881C23.263 17.1453 23.263 18.8547 22.2165 19.9119Z"
              fill="white"
            />
          </svg>
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
`;
