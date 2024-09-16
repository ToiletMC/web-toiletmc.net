import { css } from "@emotion/react";
import React from "react";
import { useRecoilState } from "recoil";
import { pageAtom, prevNextAtom } from "../states";
import { pages } from "../pages";

export default function PageFrame({ children }: React.PropsWithChildren) {
  const [page] = useRecoilState(pageAtom);
  const [prevNext] = useRecoilState(prevNextAtom);

  return (
    <div
      css={css`
        --primary: ${pages[page].color};
        padding-left: 25%;
        padding-top: 4rem;
        width: 100%;
        height: 100%;
        color: ${pages[page].color};
        padding-right: 40%;
        margin-right: 4rem;
        font-size: 2rem;
        overflow-y: auto;

        ::-webkit-scrollbar {
          background-color: transparent;
          width: 0.5rem;
          height: 0.5rem;
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--primary);
          border-radius: 10px;
        }
      `}
    >
      <div
        css={css`
          font-size: 5.5rem;
          font-family: "PPWriter";
          color: var(--primary);
          text-decoration: none;
          line-height: 1;
        `}
      >
        {pages[page].name}
        {prevNext.length === 2 && (
          <span
            css={css`
              margin-left: 1rem;
              font-family: "Josefin Sans";
              cursor: pointer;
              display: inline-flex;
              gap: 1.5rem;
            `}
          >
            <span onClick={() => prevNext[0]()}>{"<"}</span>
            <span onClick={() => prevNext[1]()}>{">"}</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
