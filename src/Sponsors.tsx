import { css } from "@emotion/react";
import React from "react";
import Danmaku from "rc-danmaku";

// const API = "https://api.toiletmc.net/afdian/sponsors";
const API = "http://localhost:3000";

// 弹幕层，显示爱发电的用户
export default function Sponsors() {
  const container = React.useRef<HTMLDivElement>(null);
  const danmaku = React.useRef<Danmaku>();

  React.useEffect(() => {
    danmaku.current = new Danmaku(container.current!, {
      speed: 160,
      maxRow: 6,
      minGapWidth: 30,
      rowHeight: 90,
    });
    (async () => {
      // 获取数据
      const data: {
        pages: number;
        data: { name: string; amount: string }[];
      } = await (await fetch(API)).json();
      // 不加参数返回的是第一页的数据，所以先把第一页加到弹幕里面
      add(data.data);
      // 然后获取其他页的数据
      for (let i = 1; i < data.pages; i++) {
        const data = await (await fetch(`${API}?page=${i}`)).json();
        add(data.data);
      }
    })();
  }, []);

  function add(data: { name: string; amount: string }[]) {
    data.forEach((item) => {
      danmaku.current?.push(
        <div
          css={css`
            border: 2px solid #5c75ec;
            outline: 5px solid #fff;
            box-shadow: 2px 1px 24px rgb(0 0 0 / 25%);
            border-radius: 15px;
            font-size: 25px;
            padding: 10px 15px;
            background-color: #fff;
            margin-top: 30px;
          `}
        >
          {item.name} 捐赠了 ￥{item.amount}
        </div>
      );
    });
  }

  return (
    <div
      css={css`
        position: absolute !important;
        top: 20px;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 100;
        pointer-events: none;
      `}
      ref={container}
    >
      {/* <button
        onClick={() => danmaku.current?.push("114514", { color: "#000" })}
      >
        push
      </button> */}
    </div>
  );
}
