import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StgDanger from "./assets/stg_danger.svg?react";
import Hand from "./assets/hand.svg?react";
import Left from "./assets/left.svg?react";
import Right from "./assets/right.svg?react";
import bg1 from "./assets/bg1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.jpeg";
import bg4 from "./assets/bg4.jpeg";
import React from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CSSPlugin from "gsap/CSSPlugin";

gsap.registerPlugin(useGSAP, CSSPlugin);

const images = [bg1, bg2, bg3, bg4];
const maskPath = new URL("./assets/stg_danger.svg#a", import.meta.url).href;

export default function App() {
  const [linksExpanded, setLinksExpanded] = React.useState(false);
  const ledRef = React.useRef<HTMLDivElement | null>(null);
  const bgRef = React.useRef<HTMLDivElement | null>(null);
  const curBgIndex = React.useRef(0);
  const dangerRef = React.useRef<HTMLDivElement | null>(null);
  const linksRef = React.useRef<HTMLDivElement | null>(null);
  const ledBoxRef = React.useRef<HTMLDivElement | null>(null);
  const buttonsRef = React.useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const [ledText, setLedText] = React.useState(
    "这是一个非常无聊但因为有趣的人而有趣起来的服务器"
  );

  useGSAP(() => {
    return gsap.fromTo(
      ledRef.current,
      { translateX: 0 },
      { translateX: "-100%", repeat: -1, duration: 5, ease: "linear" }
    );
  });

  function prevImage() {
    if (animating) return;
    setAnimating(true);
    curBgIndex.current =
      (curBgIndex.current - 1 + images.length) % images.length;
    const el = document.createElement("img");
    el.src = images[curBgIndex.current];
    el.alt = "bg";
    bgRef.current?.insertBefore(el, bgRef.current.firstChild!.nextSibling!);
    gsap
      .fromTo(
        bgRef.current,
        { marginLeft: "-100%" },
        { marginLeft: 0, duration: 0.5 }
      )
      .then(() => {
        bgRef.current?.removeChild(bgRef.current.lastChild!);
        bgRef.current!.style.marginLeft = "0";
        setAnimating(false);
      });
  }
  function nextImage() {
    if (animating) return;
    setAnimating(true);
    curBgIndex.current = (curBgIndex.current + 1) % images.length;
    const el = document.createElement("img");
    el.src = images[curBgIndex.current];
    el.alt = "bg";
    bgRef.current?.appendChild(el);
    gsap
      .fromTo(
        bgRef.current,
        { marginLeft: 0 },
        { marginLeft: "-100%", duration: 0.5 }
      )
      .then(() => {
        bgRef.current?.removeChild(bgRef.current.firstChild!.nextSibling!);
        bgRef.current!.style.marginLeft = "0";
        setAnimating(false);
      });
  }
  function play() {
    if (animating) return;
    setAnimating(true);
    setLinksExpanded(false);
    setPlaying(true);
    gsap.to(bgRef.current!.firstChild!, {
      opacity: 0,
      duration: 2,
    });
    gsap.to(bgRef.current, {
      marginTop: 0,
      duration: 0.5,
    });
    gsap
      .fromTo(
        bgRef.current,
        {
          maskSize: "100% 100%",
          marginTop: "-8rem",
        },
        {
          maskSize: "6000% 6000%",
          // marginTop: 0,
          duration: 1,
          ease: "power2.in",
        }
      )
      .then(() => {
        gsap.to(bgRef.current, {
          mask: "none",
        });
      });
    gsap.to(dangerRef.current, {
      opacity: 0,
      duration: 1,
    });
    gsap.to(linksRef.current, {
      opacity: 0,
      duration: 1,
    });
    gsap.to(ledBoxRef.current, {
      bottom: 0,
      duration: 0.5,
      zIndex: 2,
    });
    gsap.to(buttonsRef.current, {
      bottom: 95,
    });
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  }
  function stop() {
    if (animating) return;
    setAnimating(true);
    setPlaying(false);
    gsap.from(bgRef.current, {
      clearProps: "mask",
      duration: 0,
    });
    gsap.to(bgRef.current!.firstChild!, {
      opacity: 1,
      duration: 2,
    });
    gsap.fromTo(
      bgRef.current,
      {
        maskSize: "6000% 6000%",
        maskPosition: "center",
        // marginTop: 0,
      },
      {
        maskSize: "100% 100%",
        // marginTop: "-8rem",
        duration: 1,
        ease: "power2.out",
        clearProps: "mask",
      }
    );
    setTimeout(() => {
      gsap.to(bgRef.current, {
        marginTop: "-8rem",
        duration: 0.5,
      });
    }, 750);
    gsap.to(dangerRef.current, {
      opacity: 1,
      duration: 1,
    });
    gsap.to(linksRef.current, {
      opacity: 1,
      duration: 1,
    });
    gsap.to(ledBoxRef.current, {
      bottom: 63,
      duration: 0.5,
    });
    gsap.to(buttonsRef.current, {
      bottom: 151,
      clearProps: "bottom",
    });
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background-color: #fff;
          height: 100%;
          position: relative;
          overflow: hidden;
          border: 20px solid #5c75ec;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            background: #5c75ec;
            /* object-fit: cover; */
            mask-image: url("${maskPath}");
            mask-repeat: no-repeat;
            /* from */
            mask-size: contain;
            mask-position: center;
            margin-top: -8rem;
            /* to */
            /* mask-size: 1000000% 1000000%;
          mask-position: center; */

            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}
          ref={bgRef}
        >
          <div
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #5c75ec;
              /* z-index: 1; */
              opacity: 1;
            `}
          ></div>
          <img src={images[0]} alt="bg" />
        </div>
        <section
          css={css`
            position: absolute;
            top: 40px;
          `}
          ref={dangerRef}
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
              opacity: 0;
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
              top: 1rem;
              right: 0;
              font-family: "Lyusung";
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
          ref={linksRef}
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
              margin-top: -50px;
              transform: rotate(90deg);

              &.expanded {
                margin-top: -60px;
                transform: rotate(0deg);
              }
            `}
            className={clsx({
              expanded: linksExpanded,
            })}
          />
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: center;
              gap: 100px;
              transform: translateX(-100%);
              opacity: 0;
              transition: 0.3s;

              &.expanded {
                transform: translateX(0);
                opacity: 1;
              }
            `}
            className={clsx({
              expanded: linksExpanded,
            })}
          >
            <BottomLink href="https://wiki.toiletmc.net">Wiki</BottomLink>
            <BottomLink href="#">About</BottomLink>
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
          ref={buttonsRef}
        >
          {playing ? (
            <>
              <CornerButton
                css={css`
                  padding-right: 10px;
                `}
                onClick={prevImage}
              >
                <Left />
              </CornerButton>
              <CornerButton onClick={stop}>stop</CornerButton>
              <CornerButton
                css={css`
                  padding-left: 10px;
                `}
                onClick={nextImage}
              >
                <Right />
              </CornerButton>
            </>
          ) : (
            <>
              <CornerButton onClick={play}>play</CornerButton>
            </>
          )}
        </section>
      </div>
      <section
        css={css`
          position: absolute;
          bottom: 63px;
          font-weight: 800;
          color: #fff;
          font-size: 3em;
          width: 100%;
          background-color: #5c75ec;
        `}
        ref={ledBoxRef}
      >
        <div
          css={css`
            white-space: nowrap;
          `}
          ref={ledRef}
        >
          <LEDText>{ledText}</LEDText>
          <LEDText>{ledText}</LEDText>
        </div>
      </section>
    </div>
  );
}

const BottomLink = styled.a`
  text-decoration: none;
  font-weight: 800;
  font-family: sans-serif;
  color: #5c75ec;
  vertical-align: baseline;
  font-size: 150px;
  /* letter-spacing: -0.08em; */
  font-family: "TestMartinaPlanijn";

  &:hover {
    text-decoration: underline 0.7rem;
    text-underline-offset: 0.6rem;
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
  outline: 0 solid #abb9ff;
  transition: 0.3s;

  &:hover {
    outline-width: 8px;
  }
`;
