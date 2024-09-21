import { css } from "@emotion/react";
import React from "react";
import toast from "react-hot-toast";
import { pages } from "../pages";
import { useRecoilState } from "recoil";
import { isDarkAtom, isMobile, pageAtom } from "../states";
import BottomLinks from "../components/BottomLinks";
import SwitchThemeIcon from "../assets/icons/switch_theme.svg?react";
import gsap from "gsap";

/**
 * 首页点进去以后显示的5个大号链接
 */
export default function IntroLinks() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const [animating, setAnimating] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("play.toiletmc.net");
    toast.success("已复制服务器地址 :)");
  };

  const switchTheme = (event: React.MouseEvent) => {
    if (animating) return;
    setAnimating(true);
    setIsDark(!isDark);
    localStorage.setItem("isDark", JSON.stringify(isDark));
    const mousePos = { x: event.clientX, y: event.clientY };
    const introPos = document.getElementById("intro")!.getBoundingClientRect();
    gsap.set("#switch-theme-ripple", {
      position: "absolute",
      left: mousePos.x - introPos.left,
      top: mousePos.y - introPos.top,
      borderRadius: "50%",
      width: 1,
      height: 1,
      x: "-50%",
      y: "-50%",
      zIndex: 0,
      pointerEvents: "none",
      scale: 0,
      backgroundColor: isDark ? "#000" : "#fff",
    });
    gsap
      .to("#switch-theme-ripple", {
        duration: 1,
        scale: 5000,
        ease: "power2.inOut",
      })
      .then(() => {
        gsap.set("#intro-logo", {
          color: isDark ? "#000" : "#fff",
        });
        setAnimating(false);
      });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        ${isMobile
          ? `
        margin-top: 12rem;
        align-items: center;
        `
          : `
        justify-content: center;
        `}
      `}
    >
      {pages.map(
        (page, i) =>
          !page.hidden && (
            <BigLink key={i} color={page.color} to={i} alt={page.alt}>
              {page.name}
            </BigLink>
          )
      )}
      <div
        css={css`
          height: ${isMobile ? "1.5rem" : "3rem"};
        `}
      ></div>
      <BigLink color="#5c75ec" onClick={copyAddress} italic underline={false}>
        play.toiletmc.net
      </BigLink>
      <div
        css={css`
          height: ${isMobile ? "1.5rem" : "3rem"};
        `}
      ></div>
      <BottomLinks />
      {/* 切换主题按钮 */}
      <div
        css={css`
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 100;
          border-radius: 50%;
          background-color: #5c75ec;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            opacity: 0.8;
          }
          &:active {
            transform: scale(0.8);
          }
        `}
        onClick={switchTheme}
      >
        <SwitchThemeIcon />
      </div>
    </div>
  );
}

function BigLink({
  href,
  to = -1,
  children,
  onClick = () => {},
  color,
  italic = false,
  alt = "",
  underline = true,
}: React.PropsWithChildren<{
  href?: string;
  to?: number;
  onClick?: () => void;
  color: string;
  italic?: boolean;
  alt?: string;
  underline?: boolean;
}>) {
  const [, setPage] = useRecoilState(pageAtom);

  const click = () => {
    if (isMobile && to === 0) {
      window.location.href = "https://wiki.toiletmc.net";
      return;
    }
    setPage(to);
    onClick();
  };

  return (
    <a
      className="big-link"
      href={href}
      onClick={click}
      css={css`
        font-size: ${isMobile ? "3rem" : "5.5rem"};
        font-family: "PPWriter";
        color: ${color};
        text-decoration: none;
        line-height: 1;
        position: relative;
        width: fit-content;
        ${italic && "font-style: italic;"}

        &:hover {
          text-decoration: ${underline ? "underline" : "none"};
          text-decoration-thickness: 0.5rem;
          text-underline-offset: 0.625rem;
        }

        &::before {
          content: "${alt}";
          display: block;
          text-align: right;
          font-weight: lighter;
          position: absolute;
          ${isMobile
            ? `
          font-size: 1rem;
          writing-mode: vertical-rl;
          height: max-content;
          right: -1rem;
          margin-top: 0.15rem;
          `
            : `
          font-size: 0.625em;
          left: -1em;
          `}
          top: 50%;
          transform: translateY(-50%);
          /* mix-blend-mode: luminosity; */
          font-family: initial;
        }
      `}
    >
      {children}
    </a>
  );
}
