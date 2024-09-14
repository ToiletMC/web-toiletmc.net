import { css } from "@emotion/react";
import React from "react";
import Logo from "../assets/logo.svg?react";
import gsap from "gsap";
import PageHome from "../pages/PageHome";
import { pages } from "../pages";
import { useRecoilState } from "recoil";
import { pageState } from "../states";

/**
 * 显示在页面中心，从厕所的logo平滑过渡到页面内容
 */
export default function Intro() {
  const [page, setPage] = useRecoilState(pageState);
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [opened, setOpened] = React.useState(false);

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
      cursor: "default",
      duration: 1,
    });
    gsap.to("#intro-content", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
    });
    gsap.to("#intro-text", {
      opacity: isDark ? 0.5 : 1,
      color: isDark ? "#ccc" : "#5c75ec",
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
    // 切换背景颜色
    if (isDark) {
      gsap.to("#intro-logo", {
        color: page === -1 ? "#5268d4" : pages[page].color,
        duration: 1.5,
      });
    } else {
      gsap.to(document.body, {
        backgroundColor: page === -1 ? "#5c75ec" : pages[page].color,
        duration: 1.5,
      });
    }
    gsap.to("#intro-text", {
      color: isDark ? "#ccc" : page === -1 ? "#5c75ec" : pages[page].color,
      duration: 1.5,
    });
  }, [page, isDark]);

  return (
    // 外层div用于限制logo放大的尺寸
    <div
      id="intro"
      css={css`
        position: absolute;
        inset: 1.625rem;
        border-radius: 2.875rem;
        overflow: hidden;
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

          @media screen and (prefers-color-scheme: dark) {
            color: #5268d4;
            opacity: 0.5;
          }
        `}
      ></Logo>
      {/* 页面内容 */}
      <div
        id="intro-content"
        css={css`
          position: absolute;
          inset: 2.625rem;
          pointer-events: none;
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        {page === -1 ? <PageHome /> : pages[page].component}
      </div>
      {/* 左侧竖向文字 */}
      <div
        id="intro-text"
        onClick={() => setPage(-1)}
        css={css`
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          cursor: pointer;
          writing-mode: vertical-lr;
          white-space: nowrap;
          font-family: "Josefin Sans";
          font-weight: 100;
          letter-spacing: -0.07em;
          font-size: 9.25rem;
          pointer-events: none;
          opacity: 0;
          line-height: 0.5;
        `}
      >
        ToileT Minecraft
      </div>
    </div>
  );
}
