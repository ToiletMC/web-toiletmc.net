import PageAbout from "./pages/PageAbout";
import PageDownload from "./pages/PageDownload";
import PageScreenshot from "./pages/PageScreenshot";
import PageWiki from "./pages/PageWiki";

export const pages = [
  {
    name: "Wiki",
    alt: "维基",
    color: "#5cec79",
    component: <PageWiki />,
    prevNext: false,
  },
  {
    name: "About",
    alt: "关于",
    color: "#ec685c",
    component: <PageAbout />,
    prevNext: false,
  },
  {
    name: "Download",
    alt: "下载",
    color: "#eccf5c",
    component: <PageDownload />,
    prevNext: false,
  },
  {
    name: "Screenshot",
    alt: "相片",
    color: "#8e5cec",
    component: <PageScreenshot />,
    prevNext: true,
  },
];
