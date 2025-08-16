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
    {
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        /**
         * 使用说明（以后照着加）：
         * 1) “左边是站内路径（显示在文件树）”，右边是“真实下载直链（任意网站都行）”
         * 2) 每个一级目录都放两份：① 根目录下一份；② 二级目录“测试文件夹/”下一份
         * 3) 新增文件时：复制该目录的两行，改“文件名”和“URL”即可
         * 4) fileUrlTreeAnalysis 不会自动显示大小/时间 → 显示为“-”是正常的
         */

        // ===== 图片（示例：你的 PNG 直链）=====
        "/图片/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png":
          "https://cloud.993613.xyz/file/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png",
        "/图片/测试文件夹/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png":
          "https://cloud.993613.xyz/file/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png",

        // ===== 视频（示例：GitHub Releases 的 MP4 直链）=====
        "/视频/FList.1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/FList.1.mp4",
        "/视频/测试文件夹/FList.1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/FList.1.mp4",

        // ===== 微信（示例：Ubuntu ISO 直链，也可换成你的微信相关文件）=====
        "/微信/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/微信/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",

        // ===== 游戏（示例：也先放同一个 ISO，后续替换为游戏资源即可）=====
        "/游戏/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/游戏/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",

        // ===== ipa软件（示例：你的 ipa 直链）=====
        "/ipa软件/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",
        "/ipa软件/测试文件夹/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // ===== ipa插件（先用同一条直链占位，之后替换成描述文件/插件）=====
        "/ipa插件/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",
        "/ipa插件/测试文件夹/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // ===== 源码（示例：暂用 ISO 占位，之后替换为源码包/脚本）=====
        "/源码/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/源码/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",

        // ===== 安卓软件（示例：先占位，之后换成 .apk 等）=====
        "/安卓软件/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/安卓软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",

        // ===== Mac软件（示例：先占位，之后换成 .dmg/.pkg 等）=====
        "/Mac软件/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/Mac软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",

        // ===== windows（示例：你给过的 exe + 也可放 ISO）=====
        "/windows/Daxiang-win32_ia32-7.10.0-production.exe":
          "https://github.com/ddnsmax/-/releases/download/01/Daxiang-win32_ia32-7.10.0-production-7ebe4e5_1747902290088.exe",
        "/windows/测试文件夹/Daxiang-win32_ia32-7.10.0-production.exe":
          "https://github.com/ddnsmax/-/releases/download/01/Daxiang-win32_ia32-7.10.0-production-7ebe4e5_1747902290088.exe",
      }),

      // 仅在 Cloudflare Pages 部署且需要解决 PDF/TXT 预览跨域/加速时保留
      downProxy: cloudflarePagesDownProxy(),
    },
  ])
})
