import { css } from "@emotion/react";
import FileIcon from "../assets/icons/file.svg?react";
import ZipIcon from "../assets/icons/zip.svg?react";

const files = [
  {
    name: "厕所资源包【1.20-1.21.1】.zip",
    url: "https://www.toiletmc.net/files/resource-pack.zip",
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
          title={file.url}
          css={css`
            display: block;
            margin-top: 2rem;
            width: 100%;
            padding: 0.5rem 1.25rem;
            background-color: var(--primary);
            color: var(--bg);
            border-radius: 1.25rem;
            position: relative;
            font-family: "PPWriter";
            font-weight: bold;
            text-decoration: none;
            transition: 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;

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
          {file.name.endsWith(".zip") ? <ZipIcon /> : <FileIcon />}
          {file.name}
        </a>
      ))}
    </div>
  );
}
