import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import { FileList } from './src/node/index.js'
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js"
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js"

export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns: [],
  lang: 'zh-CN',
  public: `./public`,
  title: 'FList',
  description: 'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  shouldPrefetch: true,

  theme: FileList([
    // 只保留直链文件树，其他挂载与示例全部清除
    {
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        // 你的目录体系（无文件的目录不会显示）：
        // /微信/   /游戏/   /ipa软件/   /ipa插件/
        // /源码/   /安卓软件/  /Mac软件/  /windows/
        // 额外：/图片/  /视频/

        // ── 已有直链：按类型归类 ──────────────────────────────
        // 图片
        "/图片/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png":
          "https://cloud.993613.xyz/file/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png",

        // 视频（把之前示例视频都归到 /视频/ 下）
        "/视频/test2/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树测试/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",

        // ipa 软件
        "/ipa软件/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // Windows 压缩包
        "/windows/hOkcfVzT.zip":
          "https://cloud.chenyong.eu.org/file/hOkcfVzT.zip",

        // 其余目录（微信/游戏/ipa插件/源码/安卓软件/Mac软件）暂时没有现有文件，按你的要求不添加任何占位或无关链接
      }),
      // 若直链访问慢或有 CORS 问题可保留；不是 Cloudflare Pages 可移除
      downProxy: cloudflarePagesDownProxy(),
    },
  ])
})
