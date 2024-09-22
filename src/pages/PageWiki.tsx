import { css } from "@emotion/react";

export default function PageWiki() {
  return (
    <iframe
      src="https://wiki.toiletmc.net/"
      css={css`
        width: 100%;
        height: 100%;
        border: none;
      `}
    ></iframe>
  );
}
