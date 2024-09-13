import { css } from "@emotion/react";
import React from "react";
import Logo from "../assets/logo.svg?react";
import gsap from "gsap";

/**
 * 显示在页面中心，从厕所的logo平滑过渡到页面内容，接收children
 */
export default function Intro({ children }: React.PropsWithChildren) {
  /** 点击logo的事件 */
  const handleLogoClick = () => {
    gsap.to("#intro-logo", {
      scale: 25,
      duration: 7,
      // 先快后慢
      ease: "power3.out",
    });
    gsap.to("#intro-logo", {
      translateX: -800,
      duration: 1,
    });
    gsap.to("#intro-content", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
    });
  };

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

          @media screen and (prefers-color-scheme: dark) {
            color: #5268d4;
          }
        `}
      ></Logo>
      <div
        id="intro-content"
        css={css`
          position: absolute;
          inset: 2.625rem;
          pointer-events: none;
          opacity: 0;

          @media screen and (prefers-color-scheme: dark) {
            color: #ddd;
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}
