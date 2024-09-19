import { css } from "@emotion/react";
import Select from "../components/Select";
import Input from "../components/Input";
import FileSelector from "../components/FileSelector";
import SubmitIcon from "../assets/submit.svg?react";
import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { pageAtom } from "../states";

export default function PageHook() {
  const [form, setForm] = React.useState({
    hook: "",
    parameter: "",
    player: "",
    files: [] as File[],
  });
  const [, setPage] = useRecoilState(pageAtom);

  const submit = () => {
    // 验证参数
    if (form.hook === "") {
      toast.error("请选择项目");
      return;
    }
    if (form.parameter === "") {
      toast.error("请选择参数");
      return;
    }
    if (!form.player.match(/^[a-zA-Z0-9_-]{3,64}$/)) {
      toast.error("请输入正确的游戏 ID");
      return;
    }
    // if (form.files.length === 0) {
    //   toast.error("请上传附件");
    //   return;
    // }
    // 发送请求
    console.log(form);
    toast.success("提交成功");
    toast("接口还没实现呢，你在想什么");
    setPage(-1);
  };

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 2.5rem;
          gap: 2rem;
        `}
      >
        <Select
          label="项目选择"
          options={["绿色联盟", "假人放置", "建筑审核"]}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, hook: e }));
          }}
        />
        <Select
          label="参数选择"
          options={["?"]}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, parameter: e }));
          }}
        />
        <Input
          placeholder="游戏 ID"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, player: e }));
          }}
        />
        <FileSelector
          label="附件上传 (可选)"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, files: e }));
          }}
        />
      </div>
      <div
        css={css`
          position: absolute;
          right: 20%;
          top: 50%;
          transform: translate(0, -50%);
          cursor: pointer;
          width: 6rem;
          height: 6rem;
          border-radius: 2.5rem;
          background-color: var(--primary);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.2s;

          &:hover {
            opacity: 0.8;
          }
          &:active {
            transform: translate(0, -50%) scale(0.9);
          }
        `}
        onClick={submit}
      >
        <SubmitIcon />
      </div>
    </div>
  );
}
