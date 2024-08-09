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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ledText, _setLedText] = React.useState(
    "这是一个非常无聊但因为有趣的人而有趣起来的服务器"
  );

  useGSAP(() => {
    // led滚动条动画
    gsap.fromTo(
      ledRef.current,
      { translateX: 0 },
      { translateX: "-100%", repeat: -1, duration: 5, ease: "linear" }
    );
  });

  function prevImage() {
    // 防止打断
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
    // 防止打断
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
    // 防止打断
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
      bottom: -200,
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
    // 防止打断
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
      bottom: 100,
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
        {/* 页面中间的文字，会展开变成图片 */}
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
            /* box-shadow: 0 0 100px #000 inset; */

            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}
          ref={bgRef}
        >
          {/* 收起时的蓝色文字 */}
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
        {/* 占位 */}
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
          {/* 条码 */}
          <div
            css={css`
              position: absolute;
              top: 23px;
              left: 50%;
              transform: translateX(-50%);
              font-family: "Libre Barcode 128 Text";
              font-size: 128px;
              color: #5c75ec;

              @media (max-width: 830px) {
                opacity: 0;
              }
            `}
          >
            play.toiletmc.net
          </div>
          {/* 四个字 */}
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
          {/* 手指 */}
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
          {/* 链接 */}
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
          {/* 角落的按钮 */}
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
      {/* 图片预加载 */}
      <div
        css={css`
          display: inline;
          width: 0;
          height: 0;
        `}
      >
        {images.map((src) => (
          <img src={src} alt="bg" key={src} />
        ))}
      </div>
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
