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
        // ── 图片 ──────────────────────────────
        "/图片/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png":
          "https://cloud.993613.xyz/file/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png",

        // ── 视频 ──────────────────────────────
        "/视频/test2/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树测试/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",

        // ── ipa 软件 ──────────────────────────────
        "/ipa软件/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // ── Windows 压缩包 ──────────────────────────────
        "/windows/hOkcfVzT.zip":
          "https://cloud.chenyong.eu.org/file/hOkcfVzT.zip",

        // ── 源码 ──────────────────────────────
        "/源码/字典.zip":
          "https://www.ilanzou.com/s/AULZVOdG",
      }),
      // 若直链访问慢或有 CORS 问题可保留；不是 Cloudflare Pages 可移除
      downProxy: cloudflarePagesDownProxy(),
    },
  ])
})
