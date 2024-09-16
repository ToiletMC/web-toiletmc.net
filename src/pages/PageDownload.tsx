import { css } from "@emotion/react";

const files = [
  {
    name: "file.zip",
    url: "https://example.com/file.zip",
  },
];

export default function PageDownload() {
  return (
    <div>
      {files.map((file) => (
        <a
          key={file.url}
          href={file.url}
          download={file.name}
          css={css`
            display: block;
            margin-top: 2rem;
            width: 100%;
            padding: 0.5rem 1.25rem;
            background-color: var(--primary);
            color: #fff;
            border-radius: 1.25rem;
            position: relative;
            font-family: "PPWriter";
            font-weight: bold;
            text-decoration: none;
            transition: 0.2s;

            @media screen and (prefers-color-scheme: dark) {
              color: #000;
            }

            &::before {
              content: "";
              position: absolute;
              inset: -0.5rem;
              border-radius: 1.5rem;
              border: 3px solid var(--primary);
            }

            &:hover {
              opacity: 0.8;
            }
            &:active {
              transform: scale(0.95);
            }
          `}
        >
          {file.name}
        </a>
      ))}
    </div>
  );
}
