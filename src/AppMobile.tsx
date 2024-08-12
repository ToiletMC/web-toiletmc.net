import { css } from "@emotion/react";
import styled from "@emotion/styled";
import MobileStatic from "./assets/mobile_static.svg?react";
import React from "react";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { descriptions, images } from "./images";

const maskPath = new URL("./assets/mobile_danger.svg", import.meta.url).href;

export default function AppMobile() {
  const ledRef = React.useRef<HTMLDivElement | null>(null);
  const imgLedRef = React.useRef<HTMLDivElement | null>(null);
  const bgRef = React.useRef<HTMLDivElement | null>(null);
  const curBgIndex = React.useRef(0);
  const ledBoxRef = React.useRef<HTMLDivElement | null>(null);
  const staticRef = React.useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const [ledText] = React.useState(
    "这是一个非常无聊但因为有趣的人而有趣起来的服务器"
  );

  let register = () => {
    document.getElementById("barcode")?.addEventListener("click", (e) => {
      console.log(e.target);
      navigator.clipboard.writeText("play.toiletmc.net");
      toast.success("已复制服务器地址 :)");
    });
    // 自动换图
    setInterval(() => {
      nextImage();
    }, 5000);
    register = () => {};
  };

  useGSAP(() => {
    register();
    // led滚动条动画
    gsap.fromTo(
      ledRef.current,
      { translateX: 0 },
      { translateX: "-100%", repeat: -1, duration: 5, ease: "linear" }
    );
  });

  function nextImage() {
    // 防止打断
    if (animating) return;
    setAnimating(true);
    curBgIndex.current = (curBgIndex.current + 1) % images.length;
    console.log(curBgIndex);
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
          maskSize: "90%",
          marginTop: "-8rem",
        },
        {
          maskSize: "6000%",
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
    gsap.to(ledRef.current, {
      bottom: -100,
      opacity: 0,
      delay: 0.3,
    });
    gsap.to(imgLedRef.current, {
      marginLeft: 0,
      opacity: 1,
      delay: 0.3,
    });
    gsap.to(ledBoxRef.current, {
      top: 0,
      duration: 0.5,
      zIndex: 2,
    });
    gsap.to(staticRef.current, {
      bottom: -1000,
      opacity: 0,
      duration: 1.5,
    });
    setTimeout(() => {
      setAnimating(false);
    }, 1500);
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
        maskSize: "6000%",
        maskPosition: "center",
        // marginTop: 0,
      },
      {
        maskSize: "90%",
        // marginTop: "-8rem",
        duration: 1,
        ease: "power2.out",
        clearProps: "mask",
      }
    );
    gsap.to(bgRef.current, {
      marginTop: "-8rem",
      duration: 0.5,
      delay: 0.75,
    });
    gsap.to(ledBoxRef.current, {
      top: 80,
      duration: 0.5,
    });
    gsap.to(staticRef.current, {
      bottom: 52,
      opacity: 1,
      duration: 1.5,
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
            mask-size: 90%;
            mask-position: center;
            margin-top: -6.5rem;
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
          onClick={playing ? stop : play}
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
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
            /* box-shadow: 0 0 50px rgb(8% 8% 8%) inset; */
            pointer-events: none;
            transition: 0.15s;
            opacity: ${playing ? 1 : 0};
          `}
        ></div>
        <div
          css={css`
            position: absolute;
            bottom: 52px;
            left: 50%;
            transform: translateX(-50%);
          `}
          ref={staticRef}
        >
          <MobileStatic
            css={css`
              transform: scale(1.1);
            `}
          />
        </div>
      </div>
      {/* led */}
      <section
        css={css`
          position: absolute;
          top: 80px;
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
    </div>
  );
}

const LEDText = styled.span`
  width: 100%;
  display: inline-block;
`;

const BorderLink = styled.a`
  color: rgb(100% 100% 100% / 40%);
  font-size: 12px;
  text-decoration: none;
`;
