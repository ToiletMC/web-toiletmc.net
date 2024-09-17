import { css } from "@emotion/react";
import { isMobile } from "../states";

export default function BottomLinks() {
  return isMobile ? (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.25rem;
      `}
    >
      <Line>
        <BottomLink href="https://toiletmc.net/afdian" color="#9d5cec">
          爱发电
        </BottomLink>
      </Line>
      <Line>
        <BottomLink
          href="https://qm.qq.com/cgi-bin/qm/qr?k=tEmlRdjAcNJcCbPXCHwtzXJo6TFnnvNN&authKey=2v%2BpcqTvZ6h1xFKED7WhhCMdigwKfnN8XhcFsHjT6OQI81pdne9jbKiOYpztmWy3&noverify=0&group_code=720737548"
          color="#ec5c5c"
        >
          qq
        </BottomLink>
        <BottomLink href="https://toiletmc.net/bilibili" color="#ec5c5c">
          bilibili
        </BottomLink>
      </Line>
      <Line>
        <BottomLink href="https://toiletmc.net/github" color="#5cec91">
          github
        </BottomLink>
        <BottomLink href="https://toiletmc.net/gitee" color="#5cec91">
          gitee
        </BottomLink>
      </Line>
      <Line>
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
      </Line>
    </div>
  ) : (
    <Line>
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
      <BottomLink href="https://play.mcmod.cn/sv20183361.html" color="#eca95c">
        mc百科
      </BottomLink>
      <BottomLink href="https://www.fansmc.com/server/426.html" color="#eca95c">
        找服网
      </BottomLink>
      <BottomLink href="https://toiletmc.net/afdian" color="#9d5cec">
        爱发电
      </BottomLink>
    </Line>
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

function Line({ children }: React.PropsWithChildren) {
  return (
    <div
      css={css`
        display: flex;
        /* max-width: 100vw; */
        flex-wrap: wrap;
        justify-content: center;

        > :not(:last-child)::after {
          content: "·";
          margin: 0 0.25rem;
        }
      `}
    >
      {children}
    </div>
  );
}
