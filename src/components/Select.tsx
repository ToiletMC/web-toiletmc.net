import { css } from "@emotion/react";
import gsap from "gsap";
import React from "react";

export default function Select({
  options,
  label,
  onChange = () => {},
}: {
  options: string[];
  label: string;
  onChange?: (option: string) => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const menu = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = React.useState(0);
  const [buttonHeight, setButtonHeight] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [menuPosition, setMenuPosition] = React.useState({
    top: 0,
    left: 0,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const onClickOutside = React.useCallback(() => {
    if (expanded) {
      setExpanded(false);
    }
  }, [expanded]);

  const refreshPosition = () => {
    if (button.current && menu.current) {
      const buttonRect = button.current.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.top,
        left: buttonRect.left,
      });
      setButtonWidth(button.current!.offsetWidth);
      setButtonHeight(button.current!.offsetHeight);
    }
  };

  React.useEffect(() => {
    gsap.to(menu.current, {
      height: expanded ? "auto" : buttonHeight,
      zIndex: expanded ? 100 : 0,
      duration: 0.3,
    });
    gsap.to(button.current, {
      boxShadow: expanded ? "0 5px 10px #ec5c93" : "none",
      zIndex: expanded ? 101 : 1,
      duration: 0.3,
    });
  }, [buttonHeight, expanded]);

  React.useEffect(() => {
    refreshPosition();
    window.addEventListener("resize", refreshPosition);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("resize", refreshPosition);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [onClickOutside]);

  return (
    <>
      <button
        onMouseDown={handleClick}
        css={css`
          border-radius: 1.5rem;
          width: 100%;
          height: 4.8rem;
          border: none;
          background-color: transparent;
          text-align: left;
          border: 5px solid var(--primary);
          padding: 0 1.5rem;
          color: var(--primary);
          background-color: #fff;
          position: relative;

          @media screen and (prefers-color-scheme: dark) {
            background-color: #000;
          }

          &::after {
            content: "▶";
            font-size: 1.5rem;
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%) rotate(${expanded ? 90 : -90}deg);
            transition: transform 0.5s;
          }
        `}
        ref={button}
      >
        {selectedOption || label}
      </button>
      <div
        ref={menu}
        css={css`
          overflow: hidden;
          position: fixed;
          top: ${menuPosition.top}px;
          left: ${menuPosition.left}px;
          width: ${buttonWidth}px;
          border: 5px solid var(--primary);
          border-radius: 1.5rem;
          background-color: #fff;

          @media screen and (prefers-color-scheme: dark) {
            background-color: #000;
          }
        `}
      >
        <div
          css={css`
            height: ${buttonHeight}px;
          `}
        ></div>
        <div
          css={css`
            height: 0.25rem;
          `}
        ></div>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            /* gap: 0.5rem; */
            padding: 0.5rem;
            font-size: 1.5rem;
          `}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setExpanded(false);
                setSelectedOption(option);
                onChange(option);
              }}
              onMouseDown={(event) => {
                if (expanded) {
                  event.stopPropagation();
                }
              }}
              css={css`
                --hover: rgb(250 167 199 / 0.31);
                cursor: pointer;
                transition: 0.2s;
                padding-left: 2rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                border-radius: 1rem;
                ${selectedOption === option &&
                `background-color: var(--hover);`}

                &::before {
                  content: "·";
                  margin-right: 0.25rem;
                  font-weight: bold;
                }

                &:hover {
                  background-color: var(--hover);
                }
              `}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
