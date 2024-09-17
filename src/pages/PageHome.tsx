import { css } from "@emotion/react";
import React from "react";
import toast from "react-hot-toast";
import { pages } from "../pages";
import { useRecoilState } from "recoil";
import { isMobile, pageAtom } from "../states";

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
        margin-top: 10rem;
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
          height: 3rem;
        `}
      ></div>
      <BigLink color="#5c75ec" onClick={copyAddress} italic underline={false}>
        play.toiletmc.net
      </BigLink>
      <div
        css={css`
          height: 3rem;
        `}
      ></div>
      <div
        css={css`
          display: flex;
          /* max-width: 100vw; */
          flex-wrap: wrap;

          > :not(:last-child)::after {
            content: "·";
            margin: 0 0.25rem;
          }
        `}
      >
        <BottomLink
          href="https://qm.qq.com/cgi-bin/qm/qr?k=tEmlRdjAcNJcCbPXCHwtzXJo6TFnnvNN&authKey=2v%2BpcqTvZ6h1xFKED7WhhCMdigwKfnN8XhcFsHjT6OQI81pdne9jbKiOYpztmWy3&noverify=0&group_code=720737548"
          color="#ec5c5c"
        >
          qq
        </BottomLink>
        <BottomLink href="https://toiletmc.net/bilibili" color="#ec5c5c">
          bilibili
        </BottomLink>
        <BottomLink href="https://toiletmc.net/github" color="#5cec91">
          github
        </BottomLink>
        <BottomLink href="https://toiletmc.net/gitee" color="#5cec91">
          gitee
        </BottomLink>
        <BottomLink
          href="https://www.minebbs.com/threads/1-19-2.13656/"
          color="#eca95c"
        >
          minebbs
        </BottomLink>
        <BottomLink
          href="https://play.mcmod.cn/sv20183361.html"
          color="#eca95c"
        >
          mc百科
        </BottomLink>
        <BottomLink
          href="https://www.fansmc.com/server/426.html"
          color="#eca95c"
        >
          找服网
        </BottomLink>
        <BottomLink href="https://toiletmc.net/afdian" color="#9d5cec">
          爱发电
        </BottomLink>
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
          font-size: 0.625em;
          left: -1em;
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

function BottomLink({
  href,
  children,
  color,
}: React.PropsWithChildren<{
  href?: string;
  color: string;
}>) {
  return (
    <a
      href={href}
      css={css`
        font-size: 1.5rem;
        font-family: "Miriam Libre";
        font-weight: bold;
        color: ${color};
        text-decoration: none;
        line-height: 1;

        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 0.25rem;
          text-underline-offset: 0.625rem;
        }
      `}
    >
      {children}
    </a>
  );
}
