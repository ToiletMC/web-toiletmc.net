import { css } from "@emotion/react";
import PlusIcon from "../assets/icons/plus.svg?react";
import PlusNoBgIconUrl from "../assets/icons/plus_no_bg.svg?url";
import toast from "react-hot-toast";

export default function FileSelector({
  label = "附件上传",
  value = [],
  onChange = () => {},
}: {
  label?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
}) {
  const selectFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.addEventListener("change", () => {
      const selectedFiles = input.files;
      if (value.length + selectedFiles!.length > 5) {
        toast.error("最多只能上传 5 张图片");
        return;
      }
      onChange([...value, ...selectedFiles!]);
      input.remove();
    });
    input.click();
  };

  return (
    <div
      css={css`
        border-radius: 1.5rem;
        width: 100%;
        border: none;
        background-color: transparent;
        text-align: left;
        border: 5px solid var(--primary);
        padding: 1rem 1.5rem;
        background-color: var(--bg);
        color: var(--primary);
      `}
    >
      <span>{label}</span>
      <div
        css={css`
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 1rem;

          ::-webkit-scrollbar {
            height: 0.5rem;
            background-color: var(--primary);
            border-radius: 9999px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #fff;
            border-radius: 9999px;
          }
        `}
      >
        {value.map((file, i) => (
          <div
            key={i}
            css={css`
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              align-items: center;
            `}
          >
            <div
              onClick={() => {
                onChange(value.filter((f) => f.name !== file.name));
              }}
              css={css`
                width: 8rem;
                height: 8rem;
                border-radius: 1rem;
                background-image: url("${URL.createObjectURL(file)}");
                background-size: cover;
                position: relative;
                overflow: hidden;

                &:hover::before {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background-image: url("${PlusNoBgIconUrl}");
                  background-size: contain;
                  width: 3.5rem;
                  height: 3.5rem;
                  z-index: 1;
                }
                &:hover::after {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: var(--primary);
                  opacity: 0.5;
                }
              `}
            ></div>
            <span
              css={css`
                font-size: 1.2rem;
              `}
            >
              {i + 1}
            </span>
          </div>
        ))}
        <div
          css={css`
            background-color: var(--primary);
            width: 8rem;
            height: 8rem;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            flex-shrink: 0;
          `}
          onClick={selectFile}
        >
          <PlusIcon />
        </div>
      </div>
    </div>
  );
}
