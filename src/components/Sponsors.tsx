import { css } from "@emotion/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import React from "react";

type Sponsor = {
  name: string;
  amount: string;
};

const API = "https://api.toiletmc.net/afdian/sponsors";
// const API = "http://localhost:3000";

// 弹幕层，显示爱发电的用户
export default function Sponsors() {
  const container = React.useRef<HTMLDivElement>(null);
  const [sponsors, setSponsors] = React.useState<Sponsor[]>([]);

  React.useEffect(() => {
    // 获取数据
    fetch(API)
      .then((r) => r.json())
      .then((data) => add(data.data));
    gsap.fromTo(
      container.current,
      {
        y: "-100%",
      },
      {
        y: 0,
        duration: sponsors.length * 0.75,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0,0 0.011,0.1 0.011,0.1 0.011,0.1 1,1 1,1 "
        ),
      }
    );
  }, [sponsors.length]);

  function add(data: Sponsor[]) {
    setSponsors(
      data.reverse().map((item) => ({
        name: item.name.replace("爱发电用户_", ""),
        amount: item.amount,
      }))
    );
  }

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        min-height: 100%;
        right: 12%;
        z-index: 100;
        /* pointer-events: none; */
        overflow: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      `}
      ref={container}
    >
      {sponsors.map((item, i) => (
        <div
          key={i}
          css={css`
            width: fit-content;
            border: 2px solid var(--primary);
            outline: 5px solid #fff;
            box-shadow: 2px 1px 24px rgb(0 0 0 / 25%);
            border-radius: 15px;
            font-size: 25px;
            padding: 10px 15px;
            background-color: #fff;
            color: #000;
            opacity: 0.5;
          `}
        >
          {item.name} 捐赠了 ￥{item.amount}
        </div>
      ))}
    </div>
  );
}
