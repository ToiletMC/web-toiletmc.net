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
        // duration: 3,
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
        // duration: 3,
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
    el.style.width = "var(--width)";
    el.style.height = "100%";
    el.style.backgroundImage = `url(${image})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    return el;
  };
  const buildDescriptionElement = (description: string) => {
    const el = document.createElement("div");
    el.style.width = "var(--width)";
    // el.style.display = "inline-block";
    el.style.flexShrink = "0";
    el.textContent = description;
    return el;
  };

  return (
    <div
      css={css`
        --width: 60rem;
        width: var(--width);
        margin-top: 2rem;
        overflow: hidden;

        @media screen and (max-width: 1350px) {
          --width: 45rem;
        }
        @media screen and (max-width: 1020px) {
          --width: 40rem;
        }
        @media screen and (max-width: 900px) {
          --width: 30rem;
        }
        @media screen and (max-width: 730px) {
          --width: 20rem;
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          aspect-ratio: 45 / 25;
          overflow: hidden;
          border-radius: 1rem;
          position: relative;
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
        id="description"
        css={css`
          display: flex;
          overflow: auto;
          width: 200%;
          font-family: serif;
          text-align: center;
          flex-wrap: nowrap;
          margin-top: 1rem;
        `}
        ref={description}
      ></div>
    </div>
  );
}
