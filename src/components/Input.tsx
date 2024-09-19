import { css } from "@emotion/react";
import React from "react";

export default function Input({
  defaultValue = "",
  onChange = () => {},
  placeholder = "",
}: {
  defaultValue?: string;
  onChange?: (e: string) => void;
  placeholder?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      css={css`
        border-radius: 1.5rem;
        width: 100%;
        height: 4.8rem;
        border: none;
        background-color: transparent;
        text-align: left;
        border: 5px solid var(--primary);
        padding: 0 1.5rem;
        background-color: #fff;
        color: var(--primary);

        @media screen and (prefers-color-scheme: dark) {
          background-color: #000;
        }
      `}
      type="text"
      defaultValue={defaultValue}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}
