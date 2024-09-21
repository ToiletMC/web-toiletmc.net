import { css } from "@emotion/react";

export default function Input({
  value = "",
  onChange = () => {},
  placeholder = "",
}: {
  value?: string;
  onChange?: (e: string) => void;
  placeholder?: string;
}) {
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
        background-color: var(--bg);
        color: var(--primary);
      `}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}
