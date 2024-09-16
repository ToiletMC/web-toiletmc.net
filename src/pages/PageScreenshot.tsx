import { css } from "@emotion/react";
import { imageDescriptions, images } from "../images";
import React from "react";
import gsap from "gsap";
import { useRecoilState } from "recoil";
import { prevNextAtom } from "../states";

export default function PageScreenshot() {
  const [curImage, setCurImage] = React.useState(0);
  const [, setPrevImage] = React.useState(0);
  const [, setPrevNext] = useRecoilState(prevNextAtom);
  const carousel = React.useRef<HTMLDivElement>(null);
  const description = React.useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = React.useState(false);
  const [isPrev, setIsPrev] = React.useState(false);

  React.useState(() => {
    setPrevNext([
      () => {
        setIsPrev(true);
        setCurImage((prev) => (prev - 1 + images.length) % images.length);
      },
      () => {
        setIsPrev(false);
        setCurImage((prev) => (prev + 1) % images.length);
      },
    ]);
  });

  React.useEffect(() => {
    if (animating) {
      return;
    }
    setAnimating(true);
    console.log("curImage changed to", curImage, "isPrev", isPrev);
    const el = buildImageElement(images[curImage]);
    const descEl = buildDescriptionElement(imageDescriptions[curImage]);
    if (isPrev) {
      gsap.set(["#carousel", "#description"], {
        x: "-50%",
      });
      carousel.current?.insertBefore(el, carousel.current.firstChild);
      description.current?.insertBefore(descEl, description.current.firstChild);
    } else {
      carousel.current?.appendChild(el);
      description.current?.appendChild(descEl);
    }
    gsap
      .to(["#carousel", "#description"], {
        x: isPrev ? "0%" : "-50%",
      })
      .then(() => {
        (isPrev ? el.nextElementSibling : el.previousElementSibling)?.remove();
        (isPrev
          ? descEl.nextElementSibling
          : descEl.previousElementSibling
        )?.remove();
        gsap.set(["#carousel", "#description"], {
          x: 0,
        });
        setAnimating(false);
        setPrevImage(curImage);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curImage]);

  const buildImageElement = (image: string) => {
    const el = document.createElement("div");
    el.style.width = "45vw";
    el.style.height = "100%";
    el.style.backgroundImage = `url(${image})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    return el;
  };
  const buildDescriptionElement = (description: string) => {
    const el = document.createElement("div");
    el.style.width = "45vw";
    el.textContent = description;
    return el;
  };

  return (
    <div
      css={css`
        margin-top: 2rem;
      `}
    >
      <div
        css={css`
          width: 45vw;
          height: 25vw;
          overflow: hidden;
          border-radius: 1rem;
          position: relative;
          border: 3px solid var(--primary);
        `}
      >
        <div
          id="carousel"
          css={css`
            display: flex;
            overflow: auto;
            min-width: min-content;
            height: 100%;
          `}
          ref={carousel}
        ></div>
      </div>
      <div
        css={css`
          width: 45vw;
          overflow: hidden;
          border-radius: 1rem;
          position: relative;
          margin-top: 1rem;
        `}
      >
        <div
          id="description"
          css={css`
            display: flex;
            overflow: auto;
            min-width: min-content;
            height: 100%;
            font-family: serif;
            text-align: center;
          `}
          ref={description}
        ></div>
      </div>
    </div>
  );
}
