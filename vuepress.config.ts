import { viteBundler } from '@vuepress/bundler-vite'  
import { defineUserConfig } from 'vuepress'

import { FileList } from './src/node/index.js'
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js"
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js"

// 统一使用的直链（以后换文件，只改这一处 url 即可）
const ISO_URL = "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso"

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
         * 目录使用说明（以后照着加）：
         * - 每个一级目录下放两份：1) 根目录下一份；2) “测试文件夹/”下一份
         * - 只需要改左边的“路径”和右边的“直链 URL”
         * - 想新增别的文件：复制对应两行，换文件名与 URL 即可
         */

        // ===== 图片 =====
        "/图片/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/图片/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== 视频 =====
        "/视频/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/视频/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== 微信 =====
        "/微信/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/微信/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== 游戏 =====
        "/游戏/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/游戏/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== ipa软件（iOS 应用包）=====
        "/ipa软件/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/ipa软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== ipa插件（iOS 插件/越狱相关）=====
        "/ipa插件/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/ipa插件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== 源码 =====
        "/源码/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/源码/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== 安卓软件 =====
        "/安卓软件/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/安卓软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== Mac软件 =====
        "/Mac软件/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/Mac软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,

        // ===== windows =====
        "/windows/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
        "/windows/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso": ISO_URL,
      }),

      // 仅在 Cloudflare Pages 部署且要解决 PDF/TXT 等预览跨域时保留
      downProxy: cloudflarePagesDownProxy(),
    },
  ])
})
