import PageAbout from "./pages/PageAbout";
import PageDownload from "./pages/PageDownload";
import PageHook from "./pages/PageHook";
import PageScreenshot from "./pages/PageScreenshot";
import PageWiki from "./pages/PageWiki";

export const pages = [
  {
    name: "Wiki",
    alt: "维基",
    color: "#5cec79",
    component: <PageWiki />,
  },
  {
    name: "About",
    alt: "关于",
    color: "#ec685c",
    component: <PageAbout />,
  },
  {
    name: "Download",
    alt: "下载",
    color: "#eccf5c",
    component: <PageDownload />,
  },
  {
    name: "Screenshot",
    alt: "相片",
    color: "#8e5cec",
    component: <PageScreenshot />,
    prevNext: true,
  },
  {
    name: "Hook!",
    alt: "Hook",
    color: "#ec5c93",
    component: <PageHook />,
    hidden: true,
  },
];
