import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StgDanger from "./assets/stg_danger.svg?react";
import Hand from "./assets/hand.svg?react";
import Left from "./assets/left.svg?react";
import Right from "./assets/right.svg?react";
import Play from "./assets/play.svg?react";
import Stop from "./assets/stop.svg?react";
import bg1 from "./assets/bg1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.jpeg";
import bg4 from "./assets/bg4.jpeg";
import React from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CSSPlugin from "gsap/CSSPlugin";

gsap.registerPlugin(useGSAP, CSSPlugin);

const images = [bg1, bg2, bg3, bg4];
const descriptions = ["desc1", "desc2", "desc3", "desc4"];
const maskPath = new URL("./assets/stg_danger.svg#a", import.meta.url).href;

export default function App() {
  const [linksExpanded, setLinksExpanded] = React.useState(false);
  const ledRef = React.useRef<HTMLDivElement | null>(null);
  const imgLedRef = React.useRef<HTMLDivElement | null>(null);
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
    prevDescription();
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
    nextDescription();
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
  function prevDescription() {
    const el = document.createElement("div");
    el.textContent = descriptions[curBgIndex.current];
    imgLedRef.current?.insertBefore(el, imgLedRef.current.firstChild!);
    gsap.to(imgLedRef.current!.lastChild, { opacity: 0, marginLeft: 100 });
    gsap.from(el, { opacity: 0, marginLeft: -100 }).then(() => {
      imgLedRef.current?.removeChild(imgLedRef.current.lastChild!);
      imgLedRef.current!.style.marginLeft = "0";
      setAnimating(false);
    });
  }
  function nextDescription() {
    setAnimating(true);
    const el = document.createElement("div");
    el.textContent = descriptions[curBgIndex.current];
    imgLedRef.current?.appendChild(el);
    gsap.to(imgLedRef.current!.firstChild, { opacity: 0, marginLeft: -100 });
    gsap.from(el, { opacity: 0, marginLeft: 100 }).then(() => {
      imgLedRef.current?.removeChild(imgLedRef.current.firstChild!);
      imgLedRef.current!.style.marginLeft = "0";
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
    setTimeout(() => {
      gsap.to(ledRef.current, {
        bottom: -100,
        opacity: 0,
      });
      gsap.to(imgLedRef.current, {
        marginLeft: 0,
        opacity: 1,
      });
    }, 300);
    gsap.to(dangerRef.current, {
      opacity: 0,
      duration: 1,
    });
    gsap.to(linksRef.current, {
      bottom: -200,
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
    // 防止打断
    if (animating) return;
    setAnimating(true);
    setPlaying(false);
    gsap.to(ledRef.current, {
      bottom: 0,
      opacity: 1,
    });
    gsap.to(imgLedRef.current, {
      marginLeft: -100,
      opacity: 0,
    });
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
        font-family: system-ui, -apple-system, BlinkMacSystemFont, avenir next,
          avenir, helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui,
          arial, PingFang SC, Hiragino Sans GB, Noto Serif SC, Microsoft Yahei,
          WenQuanYi Micro Hei, ST Heiti, sans-serif;
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
        {/* 阴影 */}
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 44px;
            z-index: 5;
            box-shadow: 0 0 500px rgb(8% 8% 8%) inset;
            pointer-events: none;
            transition: 0.15s;
            opacity: ${playing ? 1 : 0};
          `}
        ></div>
        {/* 顶部 */}
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
              left: 60%;
              transform: translateX(-50%);
              font-family: "Libre Barcode 128 Text";
              font-size: 128px;
              color: #5c75ec;
              cursor: pointer;
            `}
            onClick={() => {
              navigator.clipboard.writeText("play.toiletmc.net");
              toast("复制成功 :)");
            }}
          >
            play.toiletmc.net
          </div>
          {/* 四个字 */}
          <div
            css={css`
              position: absolute;
              bottom: -70px;
              right: 233px;
              font-family: "Lyusung";
              color: #5c75ec;
              font-size: 128px;
            `}
          >
            厕所总部
          </div>
        </section>
        {/* 链接 */}
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
              margin-top: -60px;
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
        {/* 角落 */}
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
              <CornerButton onClick={stop}>
                <Stop />
              </CornerButton>
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
              <CornerButton onClick={play}>
                <Play />
              </CornerButton>
            </>
          )}
        </section>
      </div>
      {/* led */}
      <section
        css={css`
          position: absolute;
          bottom: 63px;
          font-weight: 800;
          color: #fff;
          font-size: 3em;
          width: 100%;
          background-color: #5c75ec;
          height: 64px;
          z-index: 1;
        `}
        ref={ledBoxRef}
      >
        <div
          css={css`
            opacity: 0;
          `}
        >
          占位
        </div>
        <div
          css={css`
            white-space: nowrap;
            position: absolute;
            top: 0;
            left: 0;
          `}
          ref={ledRef}
        >
          <LEDText>{ledText}</LEDText>
          <LEDText>{ledText}</LEDText>
        </div>
        <div
          css={css`
            margin-left: 100px;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            padding-left: 0.5em;

            > div {
              display: inline-block;
              position: absolute;
            }
          `}
          ref={imgLedRef}
        >
          <div>{descriptions[0]}</div>
        </div>
      </section>
      {/* 备案 */}
      <span
        css={css`
          position: absolute;
          bottom: 0px;
          right: 20px;
          display: flex;
          gap: 8px;
        `}
      >
        <BorderLink
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011302000137"
        >
          浙公网安备 33011302000137号
        </BorderLink>
        <BorderLink href="https://beian.miit.gov.cn/" target="“_blank”">
          浙ICP备2021038660号-4
        </BorderLink>
      </span>
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
      <Toaster />
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
  width: 50px;
  height: 50px;
  background: #5c75ec;
  color: #fff;
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
  &:active {
    transform: scale(0.7);
  }
`;

const BorderLink = styled.a`
  color: rgb(100% 100% 100% / 40%);
  font-size: 12px;
  text-decoration: none;
`;
