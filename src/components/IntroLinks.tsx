import { css } from "@emotion/react";
import React from "react";
import toast from "react-hot-toast";

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
        justify-content: center;
      `}
    >
      <LinkItem href="https://wiki.toiletmc.net/">Wiki</LinkItem>
      <LinkItem>About</LinkItem>
      <LinkItem>Download</LinkItem>
      <LinkItem>Screenshot</LinkItem>
      <LinkItem onClick={copyAddress}>play.toiletmc.net</LinkItem>
    </div>
  );
}

function LinkItem({
  href = "#",
  children,
  onClick = () => {},
}: React.PropsWithChildren<{ href?: string; onClick?: () => void }>) {
  return (
    <a
      href={href}
      onClick={onClick}
      css={css`
        font-size: 7.875rem;
        font-family: serif;
        font-weight: bold;
        color: #5c75ec;
        text-decoration: none;
        line-height: 1;

        @media screen and (prefers-color-scheme: dark) {
          color: #ddd;
        }

        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 0.5rem;
          text-underline-offset: 0.625rem;
        }
      `}
    >
      {children}
    </a>
  );
}
