import { css } from "@emotion/react";
import React from "react";
import Logo from "../assets/logo.svg?react";
import gsap from "gsap";
import PageHome from "../pages/PageHome";
import { pages } from "../pages";
import { useRecoilState } from "recoil";
import { isMobile, pageAtom, prevNextAtom } from "../states";
import PageFrame from "./PageFrame";

/**
 * 显示在页面中心，从厕所的logo平滑过渡到页面内容
 */
export default function Intro() {
  const [page, setPage] = useRecoilState(pageAtom);
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [opened, setOpened] = React.useState(false);
  const [, setPrevNext] = useRecoilState(prevNextAtom);

  /** 点击logo的事件 */
  const handleLogoClick = () => {
    setOpened(true);
    if (opened) return;
    gsap.to("#intro-logo", {
      scale: 25,
      duration: 7,
      // 先快后慢
      ease: "power3.out",
    });
    gsap.to("#intro-logo", {
      x: -800,
      color: isDark ? "#000" : undefined,
      cursor: "default",
      duration: 1,
    });
    gsap.to(["#intro-content", "#beian"], {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
    });
    gsap.to("#intro-text", {
      opacity: 1,
      color: "#5c75ec",
      pointerEvents: "auto",
      duration: 1,
      delay: 0.5,
    });
    // .big-link元素，从右往左进入，要回弹效果
    gsap.from(".big-link", {
      x: "50vw",
      opacity: 0,
      duration: 1,
      ease: "back.out",
      stagger: 0.2,
    });
  };

  React.useEffect(() => {
    console.log("navigate to", page);
    if (page > -1 && !pages[page].prevNext) {
      setPrevNext([]);
    }
    // 切换背景颜色
    // if (isDark) {
    //   gsap.to("#intro-logo", {
    //     color: page === -1 ? "#5268d4" : pages[page].color,
    //     duration: 1.5,
    //   });
    // } else {
    gsap.to(document.body, {
      backgroundColor: page === -1 ? "#5c75ec" : pages[page].color,
      duration: 1.5,
    });
    // }
    gsap.to("#intro-text", {
      color: page === -1 ? "#5c75ec" : pages[page].color,
      duration: 1.5,
    });
  }, [page, isDark, setPrevNext]);

  return (
    // 外层div用于限制logo放大的尺寸
    <div
      id="intro"
      css={css`
        position: absolute;
        inset: ${isMobile ? "0.5rem" : "1.625rem"};
        border-radius: ${isMobile ? "1.5rem" : "2.875rem"};
        overflow: hidden;
        color: ${isDark ? "#fff" : "#000"};
      `}
    >
      {/* 显示logo */}
      <Logo
        id="intro-logo"
        onClick={handleLogoClick}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 25rem;
          height: 25rem;
          cursor: pointer;
          color: #fff;

          /* @media screen and (prefers-color-scheme: dark) {
            color: #5268d4;
            opacity: 0.5;
          } */
        `}
      ></Logo>
      {/* 页面内容 */}
      <div
        id="intro-content"
        css={css`
          position: absolute;
          /* inset: 2.625rem; */
          inset: 0;
          pointer-events: none;
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* overflow: auto; */
        `}
      >
        {page === -1 ? (
          <PageHome />
        ) : page === 0 ? (
          pages[page].component
        ) : (
          <PageFrame>{pages[page].component}</PageFrame>
        )}
      </div>
      {/* 左侧竖向文字 or 移动端大logo */}
      {isMobile ? (
        <Logo
          id="intro-text"
          onClick={() => setPage(-1)}
          css={css`
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            width: 30vw;
            height: 30vw;
            cursor: pointer;
            pointer-events: none;
            opacity: 0;
          `}
        ></Logo>
      ) : (
        <div
          id="intro-text"
          onClick={() => setPage(-1)}
          css={css`
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            writing-mode: vertical-lr;
            font-size: 9.25rem;
            font-weight: 100;
            cursor: pointer;
            white-space: nowrap;
            font-family: "Josefin Sans";
            letter-spacing: -0.07em;
            pointer-events: none;
            opacity: 0;
            line-height: 0.5;
          `}
        >
          ToileT Minecraft
        </div>
      )}
      {/* 备案信息 */}
      <div
        id="beian"
        css={css`
          position: fixed;
          bottom: 4rem;
          right: ${isMobile ? "0rem" : "0.25rem"};
          font-size: ${isMobile ? "0.4rem" : "0.8rem"};
          writing-mode: vertical-lr;
          display: flex;
          gap: 1rem;
          opacity: 0;
          pointer-events: none;

          a {
            text-decoration: none;
            color: #fff;
          }
        `}
      >
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011302000137"
          target="_blank"
          rel="noopener noreferrer"
        >
          浙公网安备33011302000137号
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          浙ICP备2021038660号-4
        </a>
      </div>
    </div>
  );
}
