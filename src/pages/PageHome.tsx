import { css } from "@emotion/react";
import React from "react";
import toast from "react-hot-toast";
import { pages } from "../pages";
import { useRecoilState } from "recoil";
import { isMobile, pageAtom } from "../states";
import BottomLinks from "../components/BottomLinks";

/**
 * 首页点进去以后显示的5个大号链接
 */
export default function IntroLinks() {
  const copyAddress = () => {
    navigator.clipboard.writeText("play.toiletmc.net");
    toast.success("已复制服务器地址 :)");
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
      {pages.map((page, i) => (
        <BigLink key={i} color={page.color} to={i} alt={page.alt}>
          {page.name}
        </BigLink>
      ))}
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
